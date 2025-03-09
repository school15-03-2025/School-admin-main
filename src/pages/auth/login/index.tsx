import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../../../hooks/UseLogin";
import Link from "next/link";
import { Input } from "@/components/Input";
import Button from "@/components/Button";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: NextPage = () => {
  const { mutateAsync, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg p-8 rounded-md bg-white/60 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            size="large"
            type="email"
            {...register("email")}
            placeholder="Email"
            error={errors.email?.message}
          />

          <Input
            size="large"
            type="password"
            secureEntry
            {...register("password")}
            placeholder="Password"
            error={errors.password?.message}
          />
          <div className="text-right !mb-6">
            <Link href="/auth/forgot-password" className="underline">
              Forgot password?
            </Link>
          </div>

          <Button className="w-full" loading={isPending}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
