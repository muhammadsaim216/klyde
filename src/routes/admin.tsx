import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { GradientButton } from "@/components/ui/GradientButton";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil, LogOut, Save, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Klyde" },
      { name: "description", content: "Internal Klyde admin dashboard for managing projects, blog posts, team, services and incoming messages." },
      { property: "og:title", content: "Admin — Klyde" },
      { property: "og:description", content: "Internal Klyde admin dashboard for managing site content and messages." },
      { property: "og:url", content: "/admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type FieldType = "text" | "textarea" | "number" | "url" | "array" | "json" | "date";
type FieldDef = { key: string; label: string; type: FieldType; required?: boolean };
type TableDef = {
  key: string;
  label: string;
  table: string;
  orderBy: string;
  orderAsc?: boolean;
  fields: FieldDef[];
  readOnly?: boolean;
};

const TABLES: TableDef[] = [
  {
    key: "projects", label: "Projects", table: "projects", orderBy: "sort_order", orderAsc: true,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "category", label: "Category", type: "text", required: true },
      { key: "short", label: "Short description", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "tags", label: "Tags (comma separated)", type: "array" },
      { key: "features", label: "Features (comma separated)", type: "array" },
      { key: "metrics", label: 'Metrics (JSON: [{"label":"…","value":"…"}])', type: "json" },
      { key: "image", label: "Image URL", type: "url", required: true },
      { key: "live_url", label: "Live URL", type: "url" },
      { key: "github_url", label: "GitHub URL", type: "url" },
      { key: "sort_order", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "services", label: "Services", table: "services", orderBy: "sort_order", orderAsc: true,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "icon", label: "Icon (Code2, Smartphone, Palette, Bot, Cloud, Plug, ShoppingCart, LayoutDashboard)", type: "text", required: true },
      { key: "sort_order", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "team_members", label: "Team", table: "team_members", orderBy: "sort_order", orderAsc: true,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
      { key: "skills", label: "Skills (comma separated)", type: "array" },
      { key: "image", label: "Image URL", type: "url", required: true },
      { key: "sort_order", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "testimonials", label: "Testimonials", table: "testimonials", orderBy: "sort_order", orderAsc: true,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
      { key: "quote", label: "Quote", type: "textarea", required: true },
      { key: "image", label: "Image URL", type: "url", required: true },
      { key: "rating", label: "Rating (1-5)", type: "number" },
      { key: "sort_order", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "blog_posts", label: "Blog posts", table: "blog_posts", orderBy: "sort_order", orderAsc: true,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "category", label: "Category", type: "text", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { key: "image", label: "Image URL", type: "url", required: true },
      { key: "read_time", label: "Read time (e.g. 5 min)", type: "text", required: true },
      { key: "published_date", label: "Published date", type: "date" },
      { key: "sort_order", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "tech_stack", label: "Tech stack", table: "tech_stack", orderBy: "sort_order", orderAsc: true,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "sort_order", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "stats", label: "Stats", table: "stats", orderBy: "sort_order", orderAsc: true,
    fields: [
      { key: "label", label: "Label", type: "text", required: true },
      { key: "value", label: "Value", type: "number", required: true },
      { key: "suffix", label: "Suffix (e.g. +, %)", type: "text" },
      { key: "sort_order", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "contact_messages", label: "Contact messages", table: "contact_messages", orderBy: "created_at", orderAsc: false,
    readOnly: true,
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "budget", label: "Budget", type: "text" },
      { key: "message", label: "Message", type: "textarea" },
    ],
  },
  {
    key: "newsletter_subscribers", label: "Newsletter", table: "newsletter_subscribers", orderBy: "created_at", orderAsc: false,
    readOnly: true,
    fields: [{ key: "email", label: "Email", type: "text" }],
  },
];

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>(TABLES[0].key);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const activeDef = useMemo(() => TABLES.find((t) => t.key === active)!, [active]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-md text-center rounded-3xl glass-strong p-8">
          <h1 className="text-2xl font-display font-bold text-gradient">Not authorized</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {user.email}. You need the admin role to access this page.
          </p>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}
            className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gradient">Admin console</h1>
          <p className="text-sm text-muted-foreground mt-1">Signed in as {user.email}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="rounded-full glass px-4 py-2 text-sm">View site</Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
        {TABLES.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
              active === t.key
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <TableEditor key={activeDef.key} def={activeDef} />
    </div>
  );
}

function emptyRow(def: TableDef): Record<string, any> {
  const o: Record<string, any> = {};
  for (const f of def.fields) {
    o[f.key] = f.type === "array" ? [] : f.type === "number" ? 0 : f.type === "json" ? [] : "";
  }
  return o;
}

function TableEditor({ def }: { def: TableDef }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  async function refresh() {
    setLoading(true);
    const { data, error } = await supabase
      .from(def.table as any)
      .select("*")
      .order(def.orderBy, { ascending: def.orderAsc ?? true });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [def.key]);

  async function onDelete(id: string) {
    if (!confirm("Delete this row? This cannot be undone.")) return;
    const { error } = await supabase.from(def.table as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refresh();
  }

  return (
    <div className="rounded-3xl glass-strong p-5 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-display font-semibold">{def.label}</h2>
        {!def.readOnly && (
          <GradientButton onClick={() => { setEditing(emptyRow(def)); setCreating(true); }}>
            <Plus className="size-4 mr-1 inline" /> New
          </GradientButton>
        )}
      </div>

      {loading ? (
        <div className="py-16 flex justify-center"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
      ) : rows.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">No entries yet.</p>
      ) : (
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-white/10">
                {def.fields.slice(0, 4).map((f) => (
                  <th key={f.key} className="px-3 py-3 font-medium">{f.label}</th>
                ))}
                <th className="px-3 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                  {def.fields.slice(0, 4).map((f) => (
                    <td key={f.key} className="px-3 py-3 align-top max-w-xs truncate">
                      {renderCell(row[f.key])}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-right">
                    <div className="inline-flex gap-2">
                      {!def.readOnly && (
                        <button onClick={() => { setEditing(row); setCreating(false); }}
                                className="rounded-full glass p-2 hover:text-foreground" aria-label="Edit">
                          <Pencil className="size-4" />
                        </button>
                      )}
                      <button onClick={() => onDelete(row.id)}
                              className="rounded-full glass p-2 text-red-400 hover:text-red-300" aria-label="Delete">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <RowEditor
          def={def}
          row={editing}
          creating={creating}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); refresh(); }}
        />
      )}
    </div>
  );
}

function renderCell(v: any) {
  if (v == null) return <span className="text-muted-foreground">—</span>;
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "object") return JSON.stringify(v);
  const s = String(v);
  return s.length > 80 ? s.slice(0, 80) + "…" : s;
}

function RowEditor({
  def, row, creating, onClose, onSaved,
}: { def: TableDef; row: any; creating: boolean; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Record<string, any>>(() => ({ ...row }));
  const [saving, setSaving] = useState(false);

  function setField(key: string, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSave() {
    setSaving(true);
    const payload: Record<string, any> = {};
    for (const f of def.fields) {
      let v = form[f.key];
      if (f.type === "array" && typeof v === "string") {
        v = v.split(",").map((s: string) => s.trim()).filter(Boolean);
      }
      if (f.type === "json" && typeof v === "string") {
        try { v = v.trim() ? JSON.parse(v) : []; }
        catch { setSaving(false); return toast.error(`Invalid JSON in ${f.label}`); }
      }
      if (f.type === "number") v = v === "" || v == null ? null : Number(v);
      if (f.required && (v == null || v === "")) {
        setSaving(false);
        return toast.error(`${f.label} is required`);
      }
      payload[f.key] = v;
    }

    const { error } = creating
      ? await supabase.from(def.table as any).insert(payload)
      : await supabase.from(def.table as any).update(payload).eq("id", row.id);

    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(creating ? "Created" : "Saved");
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
         onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
           className="relative w-full max-w-2xl my-8 rounded-3xl glass-strong p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 rounded-full glass p-2"><X className="size-4" /></button>
        <h3 className="text-xl font-display font-semibold mb-5">
          {creating ? "New entry" : "Edit entry"}
        </h3>
        <div className="space-y-4">
          {def.fields.map((f) => {
            const raw = form[f.key];
            const value =
              f.type === "array" && Array.isArray(raw) ? raw.join(", ")
              : f.type === "json" && typeof raw !== "string" ? JSON.stringify(raw ?? [], null, 2)
              : raw ?? "";
            return (
              <div key={f.key}>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                  {f.label}{f.required && <span className="text-red-400 ml-1">*</span>}
                </label>
                {f.type === "textarea" || f.type === "json" ? (
                  <textarea
                    rows={f.type === "json" ? 5 : 3}
                    value={value}
                    onChange={(e) => setField(f.key, e.target.value)}
                    className="w-full rounded-xl glass px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-primary/50"
                  />
                ) : (
                  <input
                    type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                    value={value}
                    onChange={(e) => setField(f.key, e.target.value)}
                    className="w-full rounded-xl glass px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="rounded-full glass px-5 py-2.5 text-sm">Cancel</button>
          <GradientButton onClick={onSave} disabled={saving}>
            <Save className="size-4 mr-1 inline" />
            {saving ? "Saving…" : "Save"}
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
