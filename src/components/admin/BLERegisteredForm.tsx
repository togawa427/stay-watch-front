import { Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Button } from "@/components/common/Button";
import { useSelectUsers } from "@/hooks/selectUsersHook";
import { useUserRole } from "@/utils/Auth";
import { baseURL } from "@/utils/api";

export const BLERegisteredForm = () => {
  const selectUsers = useSelectUsers();
  const userRole = useUserRole();

  const form = useForm({
    initialValues: {
      id: 0,
      email: "",
      name: "",
      role: 1,
    },
    validate: {
      email: (value) => (/^\S+@gmail\S+$/.test(value) ? null : "Invalid email"),
      id: (value) => (value ? null : "Invalid user"),
      role: (value) => (value ? null : "Invalid user"),
    },
  });

  if (userRole == null) {
    return <div />;
  }

  return (
    <form
      className=" flex flex-col gap-6 p-10"
      onSubmit={form.onSubmit((values) =>
        axios
          .post(`${baseURL}/user/v1/registration`, values)
          .then((res) => {
            window.alert("成功しました");
          })
          .catch((err) => {
            window.alert("失敗しました");
            console.error(err);
          })
      )}
    >
      <Select
        classNames={{
          label: "md:text-md",
          input: "w-full",
        }}
        label="ユーザ選択"
        required
        placeholder="ユーザを選択"
        searchable
        nothingFound="No options"
        data={selectUsers}
        {...form.getInputProps("id")}
      />
      <TextInput
        placeholder="your@gmail.com"
        label="Gmailアドレス"
        required
        {...form.getInputProps("email")}
      />
      <Select
        classNames={{
          label: "md:text-md",
          input: "w-full",
        }}
        label="ユーザロール"
        placeholder="ユーザロール"
        required
        searchable
        nothingFound="No options"
        data={[
          { label: "一般ユーザ", value: userRole - 1 },
          {
            label: "研究室管理者",
            value: userRole,
          },
        ]}
        {...form.getInputProps("role")}
      />

      <div className=" mx-auto bg-red-300">
        <Button>登録する</Button>
      </div>
    </form>
  );
};
