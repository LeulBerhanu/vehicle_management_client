import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { statuses, formSchema } from "@/utils/vehicleFormZodSchema";
import { detailVehicleAPI, updateVehicleAPI } from "@/APIservices/vehiclesAPI";
import { toast } from "@/hooks/use-toast";
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

export function UpdateVehiclePage() {
  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["get-vehicle"],
    queryFn: () => detailVehicleAPI(vehicleId),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["update-vehicle"],
    mutationFn: updateVehicleAPI,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "",
    },
  });

  const { reset, formState } = form;

  useEffect(() => {
    if (data) {
      reset({
        name: data?.vehicle.name,
        status: data?.vehicle.status,
      });
    }
  }, [data, reset]);

  const onSubmit = async (data) => {
    try {
      const result = await mutateAsync({ vehicleId, ...data });
      console.log(result);
      toast({
        title: `${result.vehicle.name} - ${result.vehicle.status}`,
        description: result.message,
      });
    } catch (error) {
      console.error("Adding vehicle failed: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle className="text-xl">Update vehicle</CardTitle>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
              <Button type="submit" disabled={!formState.isDirty || isPending}>
                Update
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
