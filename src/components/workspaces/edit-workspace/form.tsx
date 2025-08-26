"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  type EditWorkspaceBody,
  useEditWorkspace,
} from "@/hooks/endpoints/workspaces";
import { editWorkspaceBody } from "@/schemas/workspaces";
import { authHeader, fileUrl } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";

type EditWorkspaceFormProps = {
  name: string;
  imagePath: string | null;
};

export default function EditWorkspaceForm({
  name,
  imagePath,
}: EditWorkspaceFormProps) {
  const { handleSubmit, register, formState, reset, control } =
    useForm<EditWorkspaceBody>({
      resolver: zodResolver(editWorkspaceBody),
      defaultValues: {
        name,
      },
    });

  const workspaceId = useWorkspaceId();
  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    fileUrl(imagePath),
  );

  const { token } = useSession();

  const { mutate, isPending } = useEditWorkspace(authHeader(token));

  const queryClient = useQueryClient();

  const router = useRouter();

  function onSubmit(data: EditWorkspaceBody) {
    mutate(
      {
        workspaceId,
        data,
      },
      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          reset();
          setImagePreview(null);
          void queryClient.invalidateQueries({
            queryKey: [`/api/v1/workspaces/${workspaceId}`],
          });
          void queryClient.invalidateQueries({
            queryKey: ["/api/v1/users/me/workspaces"],
          });
          router.push(`/workspaces/${workspaceId}`);
          toast.success("Workspace edited successfully!");
        },
      },
    );
  }

  const isDisabled = formState.isSubmitting || isPending || !formState.isDirty;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-lg bg-gray-50 p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl leading-7 font-semibold text-gray-900">
          Edit workspace
        </h2>
        <div className="mt-4 border-t border-dotted border-gray-300"></div>
      </div>

      <div className="space-y-8">
        <div>
          <label
            htmlFor="workspace-name"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Workspace name
          </label>
          <div className="mt-2">
            <input
              id="name"
              type="text"
              placeholder="Enter workspace name"
              className="block w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
              {...register("name")}
            />
            {formState.errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Workspace image
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Workspace Avatar"
                className="h-12 w-12 rounded-full object-cover"
                width={48}
                height={48}
              />
            ) : (
              <PhotoIcon
                className="h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
            )}
            <Controller
              name="image"
              control={control}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e.target.files?.[0]);
                    handleImageChange(e);
                  }}
                  className="sr-only"
                />
              )}
            />
            <label
              htmlFor="image"
              className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
            >
              Change
            </label>
          </div>
          {formState.errors.image && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.image.message}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-dotted border-gray-300"></div>

      <div className="flex items-center justify-end gap-x-6">
        <button
          onClick={() => router.push(`/workspaces/${workspaceId}`)}
          type="button"
          className="text-sm leading-6 font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isDisabled}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
