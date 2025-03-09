import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgotPassword } from "../../../hooks/useForgotPasswor"; // Ensure the import path is correct
import { Input } from "@/components/Input";
import Button from "@/components/Button";

// Define the schema to ensure email is required
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>; // This will make `email` required

const ForgotPassword: NextPage = () => {
  const { mutateAsync, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "", // Explicitly set default value for email
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data); // Debug: Check the structure of `data`
    await mutateAsync(data); // Explicitly assert the type
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg p-8 rounded-md bg-white/60 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            size="large"
            type="email"
            {...register("email")} // Will now expect a required email
            placeholder="Email"
            error={errors.email?.message}
          />
          <Button className="w-full" loading={isPending}>
            Reset
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
