import { useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { createRoot } from 'react-dom/client';

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export function useConfirm() {
  const confirm = useCallback(async (options: ConfirmOptions): Promise<boolean> => {
    const {
      title,
      description,
      confirmText = '확인',
      cancelText = '취소',
      variant = 'default',
    } = options;

    return new Promise((resolve) => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      const handleClose = (result: boolean) => {
        root.unmount();
        document.body.removeChild(container);
        resolve(result);
      };

      root.render(
        <AlertDialog open onOpenChange={() => handleClose(false)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              {description && (
                <AlertDialogDescription>{description}</AlertDialogDescription>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleClose(false)}>
                {cancelText}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleClose(true)}
                className={
                  variant === 'destructive'
                    ? 'bg-destructive hover:bg-destructive/90'
                    : ''
                }
              >
                {confirmText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    });
  }, []);

  return { confirm };
}
