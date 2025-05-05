"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import styles from "./page.module.css";

export default function AccountPage() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [profileFormData, setProfileFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileSubmitting(true);

    try {
      const response = await fetch("http://localhost:5100/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: profileFormData.name,
          email: profileFormData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Profile update failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsPasswordSubmitting(true);

    try {
      const response = await fetch("http://localhost:5100/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordFormData.currentPassword,
          newPassword: passwordFormData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Password Changed",
          description: "Your password has been updated successfully.",
        });

        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else if (response.status === 401 && data.message === "Current password is incorrect") {
        toast({
          title: "Incorrect Password",
          description: "The current password you entered is wrong.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Password change failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  const { clearCart } = useCart();

  const handleLogout = async () => {
    logout();
    clearCart();
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t("account.title") || "Account Settings"}</h1>

        {/* Profile Update */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t("account.profile") || "Profile Information"}</h2>

          <form onSubmit={handleProfileSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                {t("account.name") || "Name"}
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={profileFormData.name}
                onChange={handleProfileChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                {t("account.email") || "Email"}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileFormData.email}
                onChange={handleProfileChange}
                required
                className={styles.input}
              />
            </div>

            <Button type="submit" disabled={isProfileSubmitting} className={styles.submitButton}>
              {isProfileSubmitting ? t("account.saving") || "Saving..." : t("account.save") || "Save Changes"}
            </Button>
          </form>
        </div>

        {/* Password Change */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t("account.password") || "Change Password"}</h2>

          <form onSubmit={handlePasswordSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword" className={styles.label}>
                {t("account.currentPassword") || "Current Password"}
              </label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordFormData.currentPassword}
                onChange={handlePasswordChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                {t("account.newPassword") || "New Password"}
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordFormData.newPassword}
                onChange={handlePasswordChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmNewPassword" className={styles.label}>
                {t("account.confirmPassword") || "Confirm New Password"}
              </label>
              <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={passwordFormData.confirmNewPassword}
                onChange={handlePasswordChange}
                required
                className={styles.input}
              />
            </div>

            <Button type="submit" disabled={isPasswordSubmitting} className={styles.submitButton}>
              {isPasswordSubmitting ? t("account.saving") || "Saving..." : t("account.changePassword") || "Change Password"}
            </Button>
          </form>
        </div>

        {/* Logout */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t("account.logout") || "Logout"}</h2>
          <p className={styles.cardDescription}>
            {t("account.logoutDescription") || "Ready to leave? You can always come back later."}
          </p>
          <Button variant="outline" onClick={handleLogout} className={styles.logoutButton}>
            {t("account.logout") || "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
