export function download(
    blobParts: BlobPart[],
    filename: string,
    mimeType = "application/octet-stream",
) {
    const blob = new Blob(blobParts, { type: mimeType });

    // Create temporary object URL
    const url = URL.createObjectURL(blob);

    // Create temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Append link to body (required for Firefox)
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove link and revoke object URL
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 0);
}
