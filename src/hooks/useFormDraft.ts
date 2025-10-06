import { useCallback, useEffect } from 'react';

interface UseFormDraftProps {
  key: string;
  isEdit?: boolean;
  reset: (values?: any) => void;
  formValues: any;
  isDirty: boolean;
}

export function useFormDraft({ key, isEdit = false, reset, formValues, isDirty }: UseFormDraftProps) {
  const DRAFT_KEY = `form-draft-${key}-${isEdit ? 'edit' : 'new'}`;

  const saveDraft = useCallback((data: any) => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('No se pudo guardar el draft:', error);
    }
  }, [DRAFT_KEY]);

  const loadDraft = useCallback(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        const processedDraftData = {
          ...draftData,
          monthlySalary: parseFloat(draftData.monthlySalary) || 0
        };
        reset(processedDraftData);
      }
    } catch (error) {
      console.warn('No se pudo cargar el draft:', error);
    }
  }, [DRAFT_KEY, reset]);

  // Función para limpiar draft
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.warn('No se pudo limpiar el draft:', error);
    }
  }, [DRAFT_KEY]);

  useEffect(() => {
    if (!isEdit) {
      loadDraft();
    }
  }, [isEdit, loadDraft]);

  useEffect(() => {
    if (!isEdit && isDirty) {
      const interval = setInterval(() => {
        const draftData = {
          ...formValues,
          monthlySalary: formValues.monthlySalary.toString()
        };
        saveDraft(draftData);
      }, 30000); // 30 segundos

      return () => clearInterval(interval);
    }
  }, [formValues, isDirty, isEdit, saveDraft]);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
  };
}
