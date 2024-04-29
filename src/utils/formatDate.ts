type DateFormat = "dd/mm/yyyy" | "dd-mm-yyyy" | "yyyy-mm-dd"

export function formatDate(format: DateFormat, date: Date) {
    if (format === "dd/mm/yyyy") {
        return date.toLocaleDateString("vi-VN");
    }
    else if (format === "yyyy-mm-dd") {
        return date.getFullYear()+ "-" + (date.getMonth() + 1) + "-" +  date.getDate(); 
    }
    else {
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(); 
    }
}