import { deleteManyVehiclesAPI } from "@/APIservices/vehiclesAPI";
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

export function DeleteMultipleDialog({ data, rowSelection, setRowSelection }) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);

  const { mutateAsync } = useMutation({
    mutationKey: ["delete-many"],
    mutationFn: deleteManyVehiclesAPI,
  });

  const handleDeleteMany = async (vehicleIds) => {
    try {
      const result = await mutateAsync(vehicleIds);
      console.log(result);
      toast({
        title: "Delete many",
        description: result.message,
      });
      queryClient.invalidateQueries();
      setRowSelection({});
      closeDialog();
    } catch (error) {
      console.error("Deleting vehicles failed: ", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={Object.keys(rowSelection).length <= 1}
          className="transition duration-300"
        >
          <Trash2 />

          <p
            className={`${
              Object.keys(rowSelection).length <= 1 ? "hidden" : "block"
            } `}
          >
            Delete Selected
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete vehicle</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete vehicles?</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDeleteMany(Object.keys(rowSelection))}
          >
            <Trash2 /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
