import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResetPassword } from "../../../hooks/useResetPassword";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

const NewPassword: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const { mutateAsync, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    if (!!token && typeof token === "string") {
      await mutateAsync({ password: data.password, token });
      reset();
      router.push("/auth/login");
    } else {
      toast.error("Token is missing");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg p-8 rounded-md bg-white/60 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">
          Enter New Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            size="large"
            type="password"
            {...register("password")}
            placeholder="New Password"
            error={errors.password?.message}
          />
          <Input
            size="large"
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
          />
          <Button className="w-full" loading={isPending}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
