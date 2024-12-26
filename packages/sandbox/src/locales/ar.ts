import type { MessageSchema } from '../types/vue-i18n'

export const ar: MessageSchema = {
  krgz: {
    dir: 'rtl',
    sandbox: {
      general: {
        close: 'إغلاق',
        restart: 'إعادة تشغيل',
        stop: 'إيقاف',
      },
      loading: {
        booting: 'جاري إعداد Web Container...',
        editor: 'افتح ملفاً لتعديله',
        files: 'جار تحميل الملفات...',
        preview: 'جار إعداد النتيجة...',
        processes: 'لا يوجد عمليات قيد التشغيل',
        terminals: 'لا يوجد سطور أوامر',
      },
      panel: {
        editor: {
          readonly: 'ملف للقراءة فقط',
        },
        preview: {
          reload: 'تحديث',
        },
        terminals: {
          new: 'سطر أوامر جديد',
          open: 'افتح سطر أوامر',
        },
      },
      toggle: {
        code: 'النص البرمجي',
        result: 'النتيجة',
        processes: 'العمليات',
        solve: 'تنفيذ الحل',
        theme: 'تبديل نمط الإضاءة',
        terminal: 'سطر الأوامر',
      },
    },
  },
}
