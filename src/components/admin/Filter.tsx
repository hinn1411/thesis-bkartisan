import { Button, TextInput, Select } from "flowbite-react";
import { FC, memo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import DatePicker from "react-datepicker";

type FormData = {
  product: string;
  seller: string;
  collab: string;
  startDate: Date;
  endDate: Date;
  startPrice: string;
  endPrice: string;
  catagory: string;
  approveByAI: string;
  order: string;
};

interface FilterProps {
  setOpen: Function;
  filterOpts: any;
  setFilterOpts: Function;
  defaultValues: FormData;
  isProductPage: boolean;
}

const Filter: FC<FilterProps> = memo(
  ({ filterOpts, setFilterOpts, setOpen, defaultValues, isProductPage = true }) => {
    const {
      register,
      control,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
    } = useForm<FormData>({ defaultValues: filterOpts });

    const onSubmit = handleSubmit((data) => {
      if (isProductPage) {
        sessionStorage.setItem("productmanagement-filter", JSON.stringify(data));
      }
      else {
        sessionStorage.setItem("reviewproductmanagement-filter", JSON.stringify(data));
      }
      setFilterOpts(data);
      setOpen(false);
    });

    return (
      <>
        <Grid container spacing={1.5} p={1} rowGap={1} paddingTop={2}>
          <Grid item xs={2}>
            Tên sản phẩm:
          </Grid>
          <Grid item xs={3}>
            <TextInput
              type="text"
              placeholder="Điền tên sản phẩm"
              {...register("product")}
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={1}>
            <Button color="gray" onClick={() => reset(defaultValues)}>
              Reset
            </Button>
          </Grid>

          <Grid item xs={2}>
            Tên người bán:
          </Grid>
          <Grid item xs={3}>
            <TextInput
              type="text"
              placeholder="Điền tên người bán"
              {...register("seller")}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            Sắp xếp theo:
          </Grid>
          <Grid item xs={3}>
            <Select id="order" {...register("order")}>
              <option value={"highToLow"}>Giá cao đến thấp</option>
              <option value={"lowToHigh"}>Giá thấp đến cao</option>
              <option value={"newToOld"}>Đăng gần đây</option>
              <option value={"oldToNew"}>Đăng sớm nhất</option>
            </Select>
          </Grid>

          {isProductPage && <><Grid item xs={2}>
            Tên người duyệt:
          </Grid>
          <Grid item xs={3}>
            <TextInput
              type="text"
              placeholder="Điền tên cộng tác viên"
              {...register("collab", {
                validate: (value) => {
                  if (getValues("approveByAI") === "true" && value !== "") {
                    return false;
                  }
                  return true;
                },
              })}
              helperText={
                errors.collab && (
                  <span className="text-red-500">
                    Bạn không thể chọn Duyệt bởi AI nếu điền trường này.
                  </span>
                )
              }
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            Duyệt bởi:
          </Grid>
          <Grid item xs={3}>
            <Select id="approveByAI" {...register("approveByAI")}>
              <option value={"true"}>AI</option>
              <option value={"false"}>Cộng tác viên</option>
            </Select>
          </Grid></>}
          

          <Grid item xs={2} paddingBottom={1}>
            {isProductPage ? "Thời gian duyệt: " : "Thời gian gửi: "}
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
                  dateFormat="dd/MM/yyyy"
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
              rules={{
                validate: (value) => {
                  if (
                    getValues("startDate") != undefined &&
                    value != undefined &&
                    new Date(value) < new Date(getValues("startDate"))
                  ) {
                    console.log(getValues("startDate"), value);
                    return false;
                  } else {
                    console.log(getValues("startDate"), value);
                    return true;
                  }
                },
              }}
              render={({ field }) => (
                <>
                  <DatePicker
                    placeholderText="Ngày kết thúc"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    dateFormat="dd/MM/yyyy"
                    className="rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-sm text-gray-900"
                  />
                  {errors.endDate && (
                    <div className="text-red-500 text-sm mt-2">
                      Yêu cầu lớn hơn ngày bắt đầu
                    </div>
                  )}
                </>
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
              type="number"
              placeholder="Nhập giá tiền"
              {...register("startPrice", {
                pattern: /^\d+$/,
              })}
              helperText={
                errors.startPrice && (
                  <span className="text-red-500">
                    Vui lòng nhập giá tiền hợp lệ.
                  </span>
                )
              }
            />
          </Grid>
          <Grid item xs={0.5}>
            đến
          </Grid>
          <Grid item xs={2.5}>
            <TextInput
              type="number"
              placeholder="Nhập giá tiền"
              {...register("endPrice", {
                pattern: {
                  value: /^\d+$/,
                  message: "Vui lòng nhập giá tiền hợp lệ.",
                },
                validate: (value) => {
                  const startPrice = getValues("startPrice");
                  if (
                    startPrice != "" &&
                    startPrice.match(/^\d+$/) &&
                    value != "" &&
                    Number(startPrice) > Number(value)
                  ) {
                    return "Yêu cầu lớn hơn giá bắt đầu.";
                  }
                  return true;
                },
              })}
              helperText={
                errors.endPrice && (
                  <span className="text-red-500">
                    {errors.endPrice.message}
                  </span>
                )
              }
            />
          </Grid>
          <Grid item xs={4} />
        </Grid>
        <div className="flex justify-end gap-4 w-full">
          <Button
            color="success"
            onClick={() => {
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
  }
);

export default Filter;
