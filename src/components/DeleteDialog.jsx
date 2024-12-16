import { deleteVehicleAPI } from "@/APIservices/vehiclesAPI";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteDialog({ data }) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);

  const deleteMutation = useMutation({
    mutationKey: ["Delete-Vehicle"],
    mutationFn: deleteVehicleAPI,
  });

  const handleDelete = () => {
    deleteMutation.mutateAsync(data._id).then((res) => {
      queryClient.invalidateQueries(["vehicles"]);
      toast({
        title: "Delete",
        description: result.message,
      });
    });

    closeDialog();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-destructive transition-all duration-300"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete vehicle</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete -{" "}
          <span className="font-bold">{data.name}</span>
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            <Trash2 /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
