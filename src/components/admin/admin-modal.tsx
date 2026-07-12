"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Lock,
  Plus,
  Car,
  Building2,
  Trash2,
  Loader2,
  Check,
  ExternalLink,
  Pencil,
  X,
  Save,
} from "lucide-react";
import type { PublicBrand } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brands: PublicBrand[];
}

const DEFAULT_PASSWORD = "orient2025";

interface VehicleListItem {
  id: string;
  slug: string;
  name: string;
  brandName: string;
  brandSlug: string;
  energyType: string;
  bodyType: string | null;
  priceUsd: number;
  image: string | null;
  excerpt: string;
  featured: number;
}

interface BrandListItem {
  id: string;
  slug: string;
  name: string;
  country: string;
  founded: number | null;
  description: string;
}

export function AdminModal({ open, onOpenChange, brands }: AdminModalProps) {
  const { toast } = useToast();
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState("vehicle");

  // Brand form
  const [brandForm, setBrandForm] = useState({
    id: "" as string | null,
    name: "",
    slug: "",
    country: "China",
    founded: "",
    description: "",
    history: "",
    logo: "",
  });
  const [brandSubmitting, setBrandSubmitting] = useState(false);
  const [brandList, setBrandList] = useState<BrandListItem[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);

  // Vehicle form
  const [vehicleForm, setVehicleForm] = useState({
    id: "" as string | null,
    name: "",
    slug: "",
    brandSlug: "",
    energyType: "EV",
    bodyType: "SUV",
    priceUsd: "",
    image: "",
    excerpt: "",
    description: "",
    featured: false,
    engine: "",
    transmission: "",
    battery: "",
    range: "",
    horsepower: "",
    topSpeed: "",
    acceleration: "",
    dimensions: "",
    seating: "",
    features: "",
  });
  const [vehicleSubmitting, setVehicleSubmitting] = useState(false);
  const [vehicles, setVehicles] = useState<VehicleListItem[]>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  function slugify(s: string): string {
    return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleAuth() {
    if (!password.trim()) {
      toast({ title: "Enter password", variant: "destructive" });
      return;
    }
    setAuthed(true);
    toast({ title: "Admin access granted" });
    loadCatalog();
    loadBrands();
  }

  async function loadCatalog() {
    setLoadingCatalog(true);
    try {
      const res = await fetch("/api/admin/vehicle");
      const data = await res.json();
      if (data.vehicles) setVehicles(data.vehicles);
    } catch {
      /* ignore */
    } finally {
      setLoadingCatalog(false);
    }
  }

  async function loadBrands() {
    setLoadingBrands(true);
    try {
      const res = await fetch("/api/admin/brand");
      const data = await res.json();
      if (data.brands) setBrandList(data.brands);
    } catch {
      /* ignore */
    } finally {
      setLoadingBrands(false);
    }
  }

  function resetBrandForm() {
    setBrandForm({
      id: null, name: "", slug: "", country: "China", founded: "",
      description: "", history: "", logo: "",
    });
  }

  function resetVehicleForm() {
    setVehicleForm({
      id: null, name: "", slug: "", brandSlug: "", energyType: "EV", bodyType: "SUV",
      priceUsd: "", image: "", excerpt: "", description: "", featured: false,
      engine: "", transmission: "", battery: "", range: "", horsepower: "",
      topSpeed: "", acceleration: "", dimensions: "", seating: "", features: "",
    });
  }

  // ── Brand submit (create or update) ──
  async function submitBrand(e: React.FormEvent) {
    e.preventDefault();
    if (!brandForm.name || !brandForm.description) {
      toast({ title: "Name and description are required", variant: "destructive" });
      return;
    }
    setBrandSubmitting(true);
    try {
      const payload = {
        ...brandForm,
        slug: brandForm.slug || slugify(brandForm.name),
        founded: brandForm.founded ? parseInt(brandForm.founded) : null,
        logo: brandForm.logo || null,
        history: brandForm.history || null,
      };
      const isEdit = !!brandForm.id;
      const res = await fetch("/api/admin/brand", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(isEdit ? payload : { ...payload, id: undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast({ title: isEdit ? `✅ Brand "${payload.name}" updated!` : `✅ Brand "${payload.name}" created!` });
      resetBrandForm();
      loadBrands();
    } catch (err) {
      toast({
        title: "Failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setBrandSubmitting(false);
    }
  }

  // ── Edit brand (load into form) ──
  function editBrand(b: BrandListItem) {
    setBrandForm({
      id: b.id,
      name: b.name,
      slug: b.slug,
      country: b.country,
      founded: b.founded ? String(b.founded) : "",
      description: b.description,
      history: "",
      logo: "",
    });
    setActiveTab("brand");
    toast({ title: `Editing "${b.name}" — make changes and click Save` });
  }

  async function deleteBrand(id: string, name: string) {
    if (!confirm(`Delete brand "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/brand?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast({ title: `Deleted "${name}"` });
      loadBrands();
      loadCatalog();
    } catch (err) {
      toast({
        title: "Cannot delete",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  // ── Vehicle submit (create or update) ──
  async function submitVehicle(e: React.FormEvent) {
    e.preventDefault();
    if (!vehicleForm.name || !vehicleForm.brandSlug || !vehicleForm.excerpt || !vehicleForm.description) {
      toast({ title: "Name, brand, excerpt, and description are required", variant: "destructive" });
      return;
    }
    setVehicleSubmitting(true);
    try {
      const features = vehicleForm.features.split("\n").map((f) => f.trim()).filter(Boolean);
      const payload = {
        name: vehicleForm.name,
        slug: vehicleForm.slug || slugify(vehicleForm.name),
        brandSlug: vehicleForm.brandSlug,
        energyType: vehicleForm.energyType,
        bodyType: vehicleForm.bodyType || null,
        priceUsd: parseFloat(vehicleForm.priceUsd) || 0,
        image: vehicleForm.image || null,
        excerpt: vehicleForm.excerpt,
        description: vehicleForm.description,
        featured: vehicleForm.featured,
        specs: {
          engine: vehicleForm.engine || undefined,
          transmission: vehicleForm.transmission || undefined,
          battery: vehicleForm.battery || undefined,
          range: vehicleForm.range || undefined,
          horsepower: vehicleForm.horsepower || undefined,
          topSpeed: vehicleForm.topSpeed || undefined,
          acceleration: vehicleForm.acceleration || undefined,
          dimensions: vehicleForm.dimensions || undefined,
          seating: vehicleForm.seating || undefined,
          features: features.length > 0 ? features : undefined,
        },
      };
      const isEdit = !!vehicleForm.id;
      const res = await fetch("/api/admin/vehicle", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(isEdit ? { ...payload, id: vehicleForm.id } : payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast({ title: isEdit ? `✅ Vehicle "${payload.name}" updated!` : `✅ Vehicle "${payload.name}" created!` });
      resetVehicleForm();
      loadCatalog();
    } catch (err) {
      toast({
        title: "Failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setVehicleSubmitting(false);
    }
  }

  // ── Edit vehicle (load full data into form) ──
  async function editVehicle(v: VehicleListItem) {
    try {
      const res = await fetch(`/api/admin/vehicle?id=${v.id}`);
      const data = await res.json();
      if (!res.ok || !data.vehicle) throw new Error("Failed to load");
      const veh = data.vehicle as Record<string, unknown>;
      const specs = typeof veh.specs === "string" ? JSON.parse(veh.specs) : (veh.specs as Record<string, unknown>) || {};
      setVehicleForm({
        id: veh.id as string,
        name: veh.name as string,
        slug: veh.slug as string,
        brandSlug: veh.brandSlug as string,
        energyType: veh.energyType as string,
        bodyType: (veh.bodyType as string) || "SUV",
        priceUsd: String(veh.priceUsd ?? ""),
        image: (veh.image as string) || "",
        excerpt: veh.excerpt as string,
        description: veh.description as string,
        featured: Boolean(veh.featured),
        engine: (specs.engine as string) || "",
        transmission: (specs.transmission as string) || "",
        battery: (specs.battery as string) || "",
        range: (specs.range as string) || "",
        horsepower: (specs.horsepower as string) || "",
        topSpeed: (specs.topSpeed as string) || "",
        acceleration: (specs.acceleration as string) || "",
        dimensions: (specs.dimensions as string) || "",
        seating: (specs.seating as string) || "",
        features: Array.isArray(specs.features) ? (specs.features as string[]).join("\n") : "",
      });
      setActiveTab("vehicle");
      toast({ title: `Editing "${veh.name}" — change photo, specs, or any field` });
    } catch (err) {
      toast({ title: "Failed to load vehicle", variant: "destructive" });
    }
  }

  async function deleteVehicle(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/vehicle?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: `Deleted "${name}"` });
      loadCatalog();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  }

  // ── Login screen ──
  if (!authed) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="flex items-center gap-2">
            <Lock className="size-5 text-primary" />
            Admin Access
          </DialogTitle>
          <DialogDescription className="sr-only">
            Enter your admin password to manage the catalog
          </DialogDescription>
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-sm text-muted-foreground">
              Enter your admin password to add, edit, and manage vehicles and brands.
            </p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="admin-pw">Admin Password</Label>
              <Input
                id="admin-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                placeholder="Enter password"
              />
            </div>
            <Button onClick={handleAuth} className="gap-2">
              <Lock className="size-4" />
              Unlock Admin Panel
            </Button>
            <p className="text-xs text-muted-foreground">
              Default password is <code className="rounded bg-muted px-1 py-0.5">orient2025</code>.
              Change it via the <code className="rounded bg-muted px-1 py-0.5">ADMIN_PASSWORD</code> env var.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ── Admin panel ──
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-3xl">
        <div className="flex max-h-[92vh] flex-col">
          <div className="shrink-0 border-b border-border bg-navy-gradient p-5 text-white">
            <DialogTitle className="font-display text-lg font-bold text-white">
              Catalog Management
            </DialogTitle>
            <p className="text-sm text-white/70">Add, edit, and manage vehicles, brands & photos</p>
          </div>

          <div className="scrollbar-premium flex-1 overflow-y-auto p-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="vehicle" className="gap-1.5">
                  <Car className="size-3.5" /> Vehicle
                </TabsTrigger>
                <TabsTrigger value="brand" className="gap-1.5">
                  <Building2 className="size-3.5" /> Brand
                </TabsTrigger>
                <TabsTrigger value="catalog" className="gap-1.5">
                  Manage
                </TabsTrigger>
              </TabsList>

              {/* ── Vehicle Tab (Add / Edit) ── */}
              <TabsContent value="vehicle" className="mt-4">
                {vehicleForm.id ? (
                  <div className="mb-3 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Pencil className="size-4" />
                      Editing existing vehicle
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={resetVehicleForm}>
                      <X className="size-3.5" /> Cancel edit
                    </Button>
                  </div>
                ) : null}
                <form onSubmit={submitVehicle} className="flex flex-col gap-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Vehicle Name *">
                      <Input
                        value={vehicleForm.name}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value, slug: vehicleForm.id ? vehicleForm.slug : slugify(e.target.value) })}
                        placeholder="e.g. BYD Seal"
                      />
                    </Field>
                    <Field label="Slug">
                      <Input
                        value={vehicleForm.slug}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, slug: e.target.value })}
                        placeholder="byd-seal"
                        disabled={!!vehicleForm.id}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Brand *">
                      <Select value={vehicleForm.brandSlug} onValueChange={(v) => setVehicleForm({ ...vehicleForm, brandSlug: v })}>
                        <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                        <SelectContent>
                          {brands.map((b) => (<SelectItem key={b.id} value={b.slug}>{b.name}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Fuel Type *">
                      <Select value={vehicleForm.energyType} onValueChange={(v) => setVehicleForm({ ...vehicleForm, energyType: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EV">Electric (EV)</SelectItem>
                          <SelectItem value="HYBRID">Hybrid</SelectItem>
                          <SelectItem value="PETROL">Petrol</SelectItem>
                          <SelectItem value="DIESEL">Diesel</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Body Type">
                      <Select value={vehicleForm.bodyType} onValueChange={(v) => setVehicleForm({ ...vehicleForm, bodyType: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SEDAN">Sedan</SelectItem>
                          <SelectItem value="SUV">SUV</SelectItem>
                          <SelectItem value="MPV">MPV</SelectItem>
                          <SelectItem value="PICKUP">Pickup</SelectItem>
                          <SelectItem value="COUPE">Coupe</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Price (USD) *">
                      <Input type="number" value={vehicleForm.priceUsd} onChange={(e) => setVehicleForm({ ...vehicleForm, priceUsd: e.target.value })} placeholder="35000" />
                    </Field>
                    <Field label="Featured?">
                      <div className="flex h-10 items-center gap-2">
                        <Switch checked={vehicleForm.featured} onCheckedChange={(c) => setVehicleForm({ ...vehicleForm, featured: c })} />
                        <span className="text-sm text-muted-foreground">Show in featured section</span>
                      </div>
                    </Field>
                  </div>

                  {/* Photo with live preview */}
                  <Field label="📸 Photo URL (image link)">
                    <Input
                      type="url"
                      value={vehicleForm.image}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, image: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    {vehicleForm.image ? (
                      <div className="mt-2 overflow-hidden rounded-lg border border-border">
                        <img src={vehicleForm.image} alt="Preview" className="aspect-[16/10] w-full object-cover" />
                      </div>
                    ) : (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Paste an image URL. Get free car photos from{" "}
                        <a href="https://unsplash.com/s/photos/car" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary hover:underline">
                          Unsplash <ExternalLink className="size-3" />
                        </a>
                      </p>
                    )}
                  </Field>

                  <Field label="Short Excerpt *">
                    <Input value={vehicleForm.excerpt} onChange={(e) => setVehicleForm({ ...vehicleForm, excerpt: e.target.value })} placeholder="One-line summary shown on the card" />
                  </Field>

                  <Field label="Full Description *">
                    <Textarea rows={3} value={vehicleForm.description} onChange={(e) => setVehicleForm({ ...vehicleForm, description: e.target.value })} placeholder="Detailed description shown in the vehicle detail dialog" />
                  </Field>

                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="mb-3 text-sm font-semibold text-foreground">Specifications (optional)</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Engine"><Input value={vehicleForm.engine} onChange={(e) => setVehicleForm({ ...vehicleForm, engine: e.target.value })} placeholder="e.g. Dual Motor AWD" /></Field>
                      <Field label="Transmission"><Input value={vehicleForm.transmission} onChange={(e) => setVehicleForm({ ...vehicleForm, transmission: e.target.value })} placeholder="e.g. Single-speed" /></Field>
                      <Field label="Battery"><Input value={vehicleForm.battery} onChange={(e) => setVehicleForm({ ...vehicleForm, battery: e.target.value })} placeholder="e.g. 85 kWh LFP" /></Field>
                      <Field label="Range"><Input value={vehicleForm.range} onChange={(e) => setVehicleForm({ ...vehicleForm, range: e.target.value })} placeholder="e.g. 715 km (NEDC)" /></Field>
                      <Field label="Horsepower"><Input value={vehicleForm.horsepower} onChange={(e) => setVehicleForm({ ...vehicleForm, horsepower: e.target.value })} placeholder="e.g. 517 hp" /></Field>
                      <Field label="Top Speed"><Input value={vehicleForm.topSpeed} onChange={(e) => setVehicleForm({ ...vehicleForm, topSpeed: e.target.value })} placeholder="e.g. 185 km/h" /></Field>
                      <Field label="0–100 km/h"><Input value={vehicleForm.acceleration} onChange={(e) => setVehicleForm({ ...vehicleForm, acceleration: e.target.value })} placeholder="e.g. 3.9s" /></Field>
                      <Field label="Dimensions"><Input value={vehicleForm.dimensions} onChange={(e) => setVehicleForm({ ...vehicleForm, dimensions: e.target.value })} placeholder="e.g. 4995 × 1910 × 1495 mm" /></Field>
                      <Field label="Seating"><Input value={vehicleForm.seating} onChange={(e) => setVehicleForm({ ...vehicleForm, seating: e.target.value })} placeholder="e.g. 5 seats" /></Field>
                    </div>
                    <Field label="Features (one per line)">
                      <Textarea rows={3} value={vehicleForm.features} onChange={(e) => setVehicleForm({ ...vehicleForm, features: e.target.value })} placeholder={"15.6-inch touchscreen\nHeat pump\nADAS"} />
                    </Field>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={vehicleSubmitting} className="flex-1 gap-2">
                      {vehicleSubmitting ? <Loader2 className="size-4 animate-spin" /> : vehicleForm.id ? <Save className="size-4" /> : <Plus className="size-4" />}
                      {vehicleSubmitting ? "Saving..." : vehicleForm.id ? "Save Changes" : "Add Vehicle"}
                    </Button>
                    {vehicleForm.id ? (
                      <Button type="button" variant="outline" onClick={resetVehicleForm} className="gap-2">
                        <X className="size-4" /> Cancel
                      </Button>
                    ) : null}
                  </div>
                </form>
              </TabsContent>

              {/* ── Brand Tab (Add / Edit) ── */}
              <TabsContent value="brand" className="mt-4">
                {brandForm.id ? (
                  <div className="mb-3 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Pencil className="size-4" />
                      Editing existing brand
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={resetBrandForm}>
                      <X className="size-3.5" /> Cancel edit
                    </Button>
                  </div>
                ) : null}
                <form onSubmit={submitBrand} className="flex flex-col gap-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Brand Name *">
                      <Input value={brandForm.name} onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value, slug: brandForm.id ? brandForm.slug : slugify(e.target.value) })} placeholder="e.g. NIO" />
                    </Field>
                    <Field label="Slug">
                      <Input value={brandForm.slug} onChange={(e) => setBrandForm({ ...brandForm, slug: e.target.value })} placeholder="nio" disabled={!!brandForm.id} />
                    </Field>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Country"><Input value={brandForm.country} onChange={(e) => setBrandForm({ ...brandForm, country: e.target.value })} placeholder="China" /></Field>
                    <Field label="Founded Year"><Input type="number" value={brandForm.founded} onChange={(e) => setBrandForm({ ...brandForm, founded: e.target.value })} placeholder="2014" /></Field>
                  </div>
                  <Field label="Logo URL (optional)"><Input type="url" value={brandForm.logo} onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.value })} placeholder="https://..." /></Field>
                  <Field label="Description *"><Textarea rows={2} value={brandForm.description} onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })} placeholder="Short brand description" /></Field>
                  <Field label="History (optional)"><Textarea rows={3} value={brandForm.history} onChange={(e) => setBrandForm({ ...brandForm, history: e.target.value })} placeholder="Brand history" /></Field>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={brandSubmitting} className="flex-1 gap-2">
                      {brandSubmitting ? <Loader2 className="size-4 animate-spin" /> : brandForm.id ? <Save className="size-4" /> : <Plus className="size-4" />}
                      {brandSubmitting ? "Saving..." : brandForm.id ? "Save Changes" : "Add Brand"}
                    </Button>
                    {brandForm.id ? (
                      <Button type="button" variant="outline" onClick={resetBrandForm} className="gap-2">
                        <X className="size-4" /> Cancel
                      </Button>
                    ) : null}
                  </div>
                </form>
              </TabsContent>

              {/* ── Manage Tab (list vehicles + brands with edit/delete) ── */}
              <TabsContent value="catalog" className="mt-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">🚗 Vehicles ({vehicles.length})</h3>
                  <Button variant="outline" size="sm" onClick={loadCatalog} disabled={loadingCatalog}>
                    {loadingCatalog ? <Loader2 className="size-4 animate-spin" /> : "Refresh"}
                  </Button>
                </div>
                <div className="mb-6 flex flex-col gap-2">
                  {vehicles.length === 0 && !loadingCatalog ? (
                    <p className="py-4 text-center text-sm text-muted-foreground">No vehicles. Click Refresh.</p>
                  ) : (
                    vehicles.map((v) => (
                      <div key={v.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                          {v.image ? <img src={v.image} alt="" className="size-full object-cover" /> : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium text-foreground">{v.name}</span>
                            {v.featured ? <Badge variant="secondary" className="text-xs">Featured</Badge> : null}
                          </div>
                          <div className="text-xs text-muted-foreground">{v.brandName} · {v.energyType} · ${v.priceUsd.toLocaleString()}</div>
                        </div>
                        <button onClick={() => editVehicle(v)} className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary" aria-label={`Edit ${v.name}`}>
                          <Pencil className="size-4" />
                        </button>
                        <button onClick={() => deleteVehicle(v.id, v.name)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Delete ${v.name}`}>
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">🏢 Brands ({brandList.length})</h3>
                  <Button variant="outline" size="sm" onClick={loadBrands} disabled={loadingBrands}>
                    {loadingBrands ? <Loader2 className="size-4 animate-spin" /> : "Refresh"}
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {brandList.length === 0 && !loadingBrands ? (
                    <p className="py-4 text-center text-sm text-muted-foreground">No brands. Click Refresh.</p>
                  ) : (
                    brandList.map((b) => (
                      <div key={b.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-navy-gradient text-sm font-bold text-primary-foreground">
                          {b.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="truncate text-sm font-medium text-foreground">{b.name}</span>
                          <div className="text-xs text-muted-foreground">{b.country}{b.founded ? ` · Est. ${b.founded}` : ""}</div>
                        </div>
                        <button onClick={() => editBrand(b)} className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary" aria-label={`Edit ${b.name}`}>
                          <Pencil className="size-4" />
                        </button>
                        <button onClick={() => deleteBrand(b.id, b.name)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Delete ${b.name}`}>
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
