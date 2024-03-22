import { Button, TextInput, Select } from "flowbite-react";
import { FC, memo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import DatePicker from "react-datepicker";

type FormData = {
  seller: string;
  collab: string;
  startDate: Date;
  endDate: Date;
  startPrice: number;
  endPrice: number;
  catagory: string;
  lowPriceToHigh: boolean;
  approveByAI: boolean;
};

interface FilterProps {
  setOpen: Function;
}

const Filter: FC<FilterProps> = memo(({ setOpen }) => {
  const {
    register,
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <>
      <Grid container spacing={1.5} p={1} rowGap={1} paddingTop={2}>
        <Grid item xs={3}>
          Tên người đăng
        </Grid>
        <Grid item xs={4}>
          <TextInput
            type="text"
            placeholder="Điền tên người đăng"
            {...register("seller")}
          />
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={3}>
          Tên cộng tác viên duyệt
        </Grid>
        <Grid item xs={4}>
          <TextInput
            type="text"
            placeholder="Điền tên cộng tác viên"
            {...register("collab")}
          />
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={2} paddingBottom={1}>
          Thời gian duyệt:
        </Grid>
        <Grid item xs={0.5}>
          Từ
        </Grid>
        <Grid item xs={2.5}>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                placeholderText="Ngày bắt đầu"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className="rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-sm text-gray-900"
              />
            )}
          />
        </Grid>
        <Grid item xs={0.5}>
          đến
        </Grid>
        <Grid item xs={2.5}>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePicker
                placeholderText="Ngày kết thúc"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className="rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-sm text-gray-900"
              />
            )}
          />
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={2}>
          Giá thành
        </Grid>
        <Grid item xs={0.5}>
          Từ
        </Grid>
        <Grid item xs={2.5}>
          <TextInput
            type="text"
            placeholder="Nhập giá tiền"
            {...register("startPrice")}
          />
        </Grid>
        <Grid item xs={0.5}>
          đến
        </Grid>
        <Grid item xs={2.5}>
          <TextInput
            type="text"
            placeholder="Nhập giá tiền"
            {...register("endPrice")}
          />
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={3}>
          Loại ngành hàng:
        </Grid>
        <Grid item xs={4}>
          <Select id="catagory" {...register("catagory")}>
            <option>Trang sức</option>
            <option>Đồ gốm</option>
          </Select>
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={3}>
          Tên cộng tác viên duyệt
        </Grid>
        <Grid item xs={4}>
          <TextInput type="text" placeholder="Điền tên cộng tác viên" />
        </Grid>
      </Grid>
      <div className="flex justify-end gap-4 w-full">
        <Button
          color="success"
          onClick={() => {
            setOpen(false);
            onSubmit();
          }}
        >
          {"Xác nhận"}
        </Button>
        <Button color="gray" onClick={() => setOpen(false)}>
          Hủy
        </Button>
      </div>
    </>
  );
});

export default Filter;
