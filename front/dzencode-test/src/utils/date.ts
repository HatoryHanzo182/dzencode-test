const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function FormatSmallDate(dateString: string) 
{
    const date = new Date(dateString);

    return `${String(date.getDate()).padStart(2, "0")} / ${String(date.getMonth() + 1).padStart(2, "0")}`
}

export function FormatBigDate(dateString: string) 
{
    const date = new Date(dateString);

    return `${String(date.getDate()).padStart(2, "0")} / ${months[date.getMonth()]} / ${date.getFullYear()}`;
}

export function FormatDate(dateString: string) 
{
    const date = new Date(dateString);

    return `${String(date.getDate()).padStart(2, "0")} / ${String(date.getMonth() + 1).padStart(2, "0")} / ${date.getFullYear()}`;
}