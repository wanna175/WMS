import JoinMembershipUI from "./joinMembership.presenter";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { errorModal, successModal } from "../../../lib/util";
import { useState } from "react";
import axios from "axios";
export default function JoinMembership() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      userId: "",
      storageId: "",
      userPw: "",
      userPw2: "",
      userName: "",
      userBirth: "",
      userEmail: "",
      userContact: "",
    },
    mode: "onChange",
  });
  const joinMembership = async (signInData) => {
    try {
      const auth = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await auth.post("/auth/join", signInData);
    } catch (error) {
      throw error;
    }
  };
  const onSubmitRegister = async (data) => {
    try {
      console.log("register: " + data.userId);

      //rest든 graphql이든 우리 백앤드로 data로 날리는 구간(await)
      const response = await joinMembership(data);
      successModal("success", "히히" + response);
      //모달에서 ok눌렀을때 push되도록 하자 나중에
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) errorModal("fail", error.message);
    }
  };
  const onError = (data) => {
    errorModal("fail", "다시한번 입력해주세요");
  };
  const SwitchModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const onClickCancel = () => {
    router.push(`/login`);
  };
  return (
    <JoinMembershipUI
      register={register}
      handleSubmit={handleSubmit}
      onSubmitRegister={onSubmitRegister}
      errors={errors}
      onError={onError}
      onClickCancel={onClickCancel}
      isValid={isValid}
      isModalOpen={isModalOpen}
      SwitchModal={SwitchModal}
    />
  );
}
