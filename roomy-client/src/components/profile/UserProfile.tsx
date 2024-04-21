"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdateUserReq, useGetUserQuery, useUpdateUserMutation } from "@/store/services/user-service";
import { useState } from "react";

export default function Profile() {
  const { data: userData, isLoading: userLoading, isError: isUserError } = useGetUserQuery();
  const [
    updateUser,
    { data: updatedUser, error: updateError, isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateUserMutation();
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  if (userLoading) {
    return <ProfileSkeleton />;
  }
  if (isUserError) {
    return <ErrorComponent message={"Cannot Fetch User...Please try again"} />;
  }

  function handleUpdateUser(): void {
    const updateUserDetails: UpdateUserReq = {
      phone: phone,
      name: name,
    };
    updateUser(updateUserDetails);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 my-12">
        <div className="flex items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <div className="flex items-center gap-2">
                <Input defaultValue={userData?.name} id="name" />
                <Button className="bg-pink-500 hover:bg-pink-600 text-white" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input onChange={(e) => setName(e.target.value)} defaultValue={userData?.email} disabled id="email" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center gap-2">
                <Input defaultValue={userData?.phone || "888-888-8888"} id="phone" />
                <Button onClick={handleUpdateUser} className="bg-pink-500 hover:bg-pink-600 text-white" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </div>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full">Logout</Button>
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 my-12 animate-pulse">
      <div className="flex items-center justify-center">
        <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="block text-sm text-gray-300" htmlFor="name">
              Name
            </label>
            <div className="flex items-center gap-2">
              <div className="h-8 bg-gray-300 w-40 rounded-md"></div>
              <div className="h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-md cursor-pointer w-20"></div>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-gray-300" htmlFor="email">
            Email
          </label>
          <div className="h-8 bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="block text-sm text-gray-300" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              <div className="h-8 bg-gray-300 w-40 rounded-md"></div>
              <div className="h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-md cursor-pointer w-20"></div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-md cursor-pointer w-full"></div>
      </div>
    </div>
  );
}

export function ErrorComponent({ message }: { message: string }) {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-red-100 rounded-lg shadow-lg space-y-6 my-12">
      <div className="text-red-700 font-semibold text-lg">{message}</div>
    </div>
  );
}
