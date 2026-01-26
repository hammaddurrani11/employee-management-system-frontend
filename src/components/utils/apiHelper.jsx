import { toast } from "react-toastify";

export const handleError = (error) => {
    if (!error) {
        toast.error("Something went wrong");
        return;
    }

    const res = error.response;

    const getMessage = () => {
        if (!res) return error.message || "Something went wrong";

        const data = res.data;
        if (!data) return res.statusText || "Something went wrong";

        if (Array.isArray(data.error)) {
            return data.error.join("\n");
        }
        return data.error || "Something went wrong";
    };

    if (!res) {
        // Network error or no response
        toast.error("Network error: " + error.message);
        return;
    }

    switch (res.status) {
        case 401:
            toast.error("Unauthorized: " + getMessage());
            break;
        case 403:
            toast.error("Forbidden: " + getMessage());
            break;
        case 404:
            toast.error("Not Found: " + getMessage());
            break;
        case 500:
            toast.error("Server Error: " + getMessage());
            break;
        default:
            toast.error("Error: " + getMessage());
    }
};
