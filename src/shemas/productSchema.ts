import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "اسم المنتج يجب أن يكون 3 أحرف على الأقل"),

  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),

  category: z.string().min(1, "اختر تصنيفًا"),

  buyPrice: z.number().min(1, "سعر الشراء يجب أن يكون أكبر من صفر"),

  sellPrice: z.number().min(1, "سعر البيع يجب أن يكون أكبر من صفر"),

  quantity: z.number().min(0, "الكمية لا يمكن أن تكون سالبة"),

  minStock: z.number().min(0, "الحد الأدنى لا يمكن أن يكون سالبًا"),
});
export type ProductForm = z.infer<typeof productSchema>;
