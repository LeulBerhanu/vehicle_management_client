import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { statuses, formSchema } from "@/utils/vehicleFormZodSchema";
import { useMutation } from "@tanstack/react-query";
import { createVehicleAPI } from "@/APIservices/vehiclesAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function AddVehiclePage() {
  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["create-vehicle"],
    mutationFn: createVehicleAPI,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await mutateAsync(data);
      console.log(result);
      toast({
        title: `${result.vehicle.name} - ${result.vehicle.status}`,
        description: result.message,
      });
      navigate("/");
    } catch (error) {
      console.error("Adding vehicle failed: ", error);
      navigate("/");
    }
  };

  return (
    <div className="grid place-items-center h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle className="text-xl">Add vehicle</CardTitle>
              <CardDescription>Fill in all the fields.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Vehicle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Toyota" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses?.map((status, index) => (
                          <SelectItem key={index} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between mt-2">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => navigate("..")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
