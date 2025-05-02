import { Button as ShadcnButton } from "@/components/ui/button"
import { forwardRef } from "react"
import type React from "react"
import styles from "./button.module.css"

type ShadcnProps = Omit<React.ComponentProps<typeof ShadcnButton>, "variant">

interface ButtonProps extends ShadcnProps {
  variant?: "default" | "primary" | "outline" | "ghost"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantClass = variant === "primary" ? styles.primary : ""

    return (
      <ShadcnButton ref={ref} className={`${variantClass} ${className || ""}`} {...props}>
        {children}
      </ShadcnButton>
    )
  },
)

Button.displayName = "Button"

export { Button }
