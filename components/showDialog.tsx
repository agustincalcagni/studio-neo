import { createRoot } from "react-dom/client";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface DialogProps {
  content: ReactNode;
  title?: string | null;
  headerColor?: string;
}

export const showDialog = ({
  content,
  title = null,
  headerColor = "oklch(70.4% 0.191 22.216)",
}: DialogProps) => {
  const dialog = document.createElement("dialog");
  document.body.appendChild(dialog);

  const root = createRoot(dialog);
  const controller = new AbortController();

  dialog.style.animation = "slideIn 0.3s ease-out";
  dialog.showModal();

  const closeDialogWithAnimation = () => {
    dialog.style.animation = "slideOut .25s ease-in";

    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal },
    );
  };

  root.render(
    <div className="relative">
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-1 border-b border-slate-900 bg-red-400/60"
        style={{ background: headerColor }}
      >
        <h3 className="font-sans-elegant text-sm uppercase tracking-wider text-white">
          {title || "Studio Neo"}
        </h3>
        <button
          onClick={closeDialogWithAnimation}
          className="w-8 h-8 flex items-center justify-center hover:bg-zinc-900/50 rounded-md transition-colors duration-200"
          title="Cerrar"
        >
          <X size={18} className="text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-1 font-sans-elegant text-white">{content}</div>
    </div>,
  );

  dialog.addEventListener(
    "click",
    (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;
      if (!isInDialog) {
        closeDialogWithAnimation();
      }
    },
    { signal: controller.signal },
  );
};

export const closeDialog = () => {
  const dialog = document.querySelector("dialog");
  if (dialog) {
    dialog.style.animation = "slideOut .25s ease-in";
    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
      },
      { once: true },
    );
  }
};
