import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Loader2, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface InsurancePlan {
  id: string;
  category_id: string;
  plan_number: string;
  name: string;
  description: string;
  min_age: number;
  max_age: number;
  min_term: number;
  max_term: number;
  min_sum_assured: number;
  features: string[];
  benefits: string[];
  eligibility: string[];
  is_active: boolean;
}

const categories = [
  { id: "term", name: "Term Plans" },
  { id: "endowment", name: "Endowment Plans" },
  { id: "children", name: "Children Plans" },
  { id: "pension", name: "Pension Plans" },
  { id: "moneyback", name: "Money Back Plans" },
  { id: "health", name: "Health Plans" },
  { id: "ulip", name: "ULIP Plans" },
  { id: "wholelife", name: "Whole Life Plans" },
];

export function PlansManagement() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<InsurancePlan | null>(null);
  const [fetchPlanNumber, setFetchPlanNumber] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    plan_number: "",
    name: "",
    description: "",
    min_age: 18,
    max_age: 65,
    min_term: 10,
    max_term: 30,
    min_sum_assured: 100000,
    features: "",
    benefits: "",
    eligibility: "",
  });

  const { data: plans, isLoading } = useQuery({
    queryKey: ["insurance_plans"],
    queryFn: async () => {
      // Use type assertion since the table was just created
      const { data, error } = await supabase
        .from("insurance_plans" as any)
        .select("*")
        .order("category_id", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as InsurancePlan[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<InsurancePlan>) => {
      const { error } = await supabase.from("insurance_plans" as any).insert([data] as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insurance_plans"] });
      toast.success("Plan added successfully");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to add plan: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsurancePlan> }) => {
      const { error } = await supabase.from("insurance_plans" as any).update(data as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insurance_plans"] });
      toast.success("Plan updated successfully");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update plan: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("insurance_plans" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insurance_plans"] });
      toast.success("Plan deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete plan: " + error.message);
    },
  });

  const resetForm = () => {
    setEditingPlan(null);
    setFormData({
      category_id: "",
      plan_number: "",
      name: "",
      description: "",
      min_age: 18,
      max_age: 65,
      min_term: 10,
      max_term: 30,
      min_sum_assured: 100000,
      features: "",
      benefits: "",
      eligibility: "",
    });
  };

  const handleEdit = (plan: InsurancePlan) => {
    setEditingPlan(plan);
    setFormData({
      category_id: plan.category_id,
      plan_number: plan.plan_number,
      name: plan.name,
      description: plan.description,
      min_age: plan.min_age,
      max_age: plan.max_age,
      min_term: plan.min_term,
      max_term: plan.max_term,
      min_sum_assured: plan.min_sum_assured,
      features: plan.features?.join("\n") || "",
      benefits: plan.benefits?.join("\n") || "",
      eligibility: plan.eligibility?.join("\n") || "",
    });
    setIsDialogOpen(true);
  };

  const handleFetchFromLIC = async () => {
    if (!fetchPlanNumber.trim()) {
      toast.error("Please enter a plan number");
      return;
    }

    setIsFetching(true);
    try {
      const { data, error } = await supabase.functions.invoke("fetch-lic-plan", {
        body: { planNumber: fetchPlanNumber.trim() },
      });

      if (error) throw error;

      if (data?.success && data?.plan) {
        const plan = data.plan;
        setFormData({
          category_id: plan.category_id || "",
          plan_number: plan.plan_number || fetchPlanNumber,
          name: plan.name || "",
          description: plan.description || "",
          min_age: plan.min_age || 18,
          max_age: plan.max_age || 65,
          min_term: plan.min_term || 10,
          max_term: plan.max_term || 30,
          min_sum_assured: plan.min_sum_assured || 100000,
          features: plan.features?.join("\n") || "",
          benefits: plan.benefits?.join("\n") || "",
          eligibility: plan.eligibility?.join("\n") || "",
        });
        toast.success("Plan details fetched from LIC website!");
        setIsDialogOpen(true);
      } else {
        toast.error(data?.error || "Could not fetch plan details");
      }
    } catch (error: any) {
      toast.error("Failed to fetch plan: " + error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const planData = {
      category_id: formData.category_id,
      plan_number: formData.plan_number,
      name: formData.name,
      description: formData.description,
      min_age: formData.min_age,
      max_age: formData.max_age,
      min_term: formData.min_term,
      max_term: formData.max_term,
      min_sum_assured: formData.min_sum_assured,
      features: formData.features.split("\n").filter(f => f.trim()),
      benefits: formData.benefits.split("\n").filter(b => b.trim()),
      eligibility: formData.eligibility.split("\n").filter(e => e.trim()),
    };

    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, data: planData });
    } else {
      createMutation.mutate(planData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Insurance Plans Management</h2>
      </div>

      {/* Fetch from LIC Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fetch Plan from LIC Website</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter LIC Plan Number (e.g., 954, 915, 945)"
                value={fetchPlanNumber}
                onChange={(e) => setFetchPlanNumber(e.target.value)}
              />
            </div>
            <Button onClick={handleFetchFromLIC} disabled={isFetching}>
              {isFetching ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Fetch Plan Details
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); }}>
                  <Plus className="w-4 h-4 mr-2" /> Add Manual
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingPlan ? "Edit Plan" : "Add New Plan"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={formData.category_id}
                        onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Plan Number</Label>
                      <Input
                        value={formData.plan_number}
                        onChange={(e) => setFormData({ ...formData, plan_number: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Plan Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label>Min Age</Label>
                      <Input
                        type="number"
                        value={formData.min_age}
                        onChange={(e) => setFormData({ ...formData, min_age: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Max Age</Label>
                      <Input
                        type="number"
                        value={formData.max_age}
                        onChange={(e) => setFormData({ ...formData, max_age: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Min Term</Label>
                      <Input
                        type="number"
                        value={formData.min_term}
                        onChange={(e) => setFormData({ ...formData, min_term: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Max Term</Label>
                      <Input
                        type="number"
                        value={formData.max_term}
                        onChange={(e) => setFormData({ ...formData, max_term: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Min Sum Assured (₹)</Label>
                    <Input
                      type="number"
                      value={formData.min_sum_assured}
                      onChange={(e) => setFormData({ ...formData, min_sum_assured: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <Label>Features (one per line)</Label>
                    <Textarea
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      rows={4}
                      placeholder="Enter each feature on a new line"
                    />
                  </div>

                  <div>
                    <Label>Benefits (one per line)</Label>
                    <Textarea
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      rows={4}
                      placeholder="Enter each benefit on a new line"
                    />
                  </div>

                  <div>
                    <Label>Eligibility (one per line)</Label>
                    <Textarea
                      value={formData.eligibility}
                      onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                      rows={4}
                      placeholder="Enter each eligibility criterion on a new line"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      {editingPlan ? "Update Plan" : "Add Plan"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Plans List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : plans && plans.length > 0 ? (
        <div className="grid gap-4">
          {categories.map((category) => {
            const categoryPlans = plans.filter((p) => p.category_id === category.id);
            if (categoryPlans.length === 0) return null;
            
            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categoryPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{plan.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Plan No. {plan.plan_number} | Age: {plan.min_age}-{plan.max_age} years
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(plan)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Plan</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{plan.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteMutation.mutate(plan.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No plans added yet. Use the "Fetch Plan Details" button above to add plans from LIC website.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
