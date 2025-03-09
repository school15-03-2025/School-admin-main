import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { useChangePassword } from "@/hooks/useChangePassword";

type ChangePasswordFormData = {
  password: string;
  newPassword: string;
  confirmPassword?: string;
};

const ChangePassword: NextPage = () => {
  const { mutateAsync, isPending } = useChangePassword();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangePasswordFormData) => {
    delete data.confirmPassword;
    await mutateAsync(data);
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg p-8 rounded-md bg-white/60 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Change Password</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input size="large" type="password" {...register("password", { required: "Current password is required" })} placeholder="Current Password" error={errors.password?.message} />
          <Input size="large" type="password" {...register("newPassword", { required: "New password is required" })} placeholder="New Password" error={errors.newPassword?.message} />
          <Input
            size="large"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) => value === newPassword || "Passwords do not match",
            })}
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
          />
          <Button className="w-full" type="submit" loading={isPending}>
            {isPending ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
