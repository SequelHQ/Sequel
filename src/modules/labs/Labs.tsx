import { useState } from "react";
import { getFiles, storeFiles } from "src/helpers/storage";
import { LabsEmptyState } from "./EmptyState";
import * as PDFJS from "pdfjs-dist";
// @ts-ignore
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";
import FileTag from "src/components/chat/FileTag";
import { SkeletonFileTag } from "src/components/SkeletonFileTag";
import toast from "react-hot-toast";
import { FileType } from "src/helpers/types/file.types";
import { makeOrgans } from "src/helpers/utils/makeOrgans";
import { makeInsight } from "src/helpers/utils/makeInsight";

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const extractTextFromPDFBase64 = async (base64String: string) => {
	try {
		const pdfData = atob(base64String);
		const loadingTask = PDFJS.getDocument({ data: pdfData });
		const pdf = await loadingTask.promise;
		let fullText = "";

		for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
			const page = await pdf.getPage(pageNum);
			const textContent = await page.getTextContent();
			const textItems = textContent.items.map((item: any) => item.str);
			fullText += textItems.join(" ") + "\n";
		}

		return fullText;
	} catch (error) {
		console.error("Error processing base64 or extracting text:", error);
		throw error;
	}
};

const Labs = () => {
	const [files, setFiles] = useState<FileType[]>(getFiles());
	const [isDragging, setIsDragging] = useState(false);
	const [loading, setLoading] = useState(false);
  
	const uploadFiles = async (filesToUpload: File[]) => {
		setLoading(true);
		const uploadPromises = filesToUpload.map(async (file) => {
			const file_b64: any = await toBase64(file);
			let fileContent = "";
      
			if (file.type === "application/pdf") {
				fileContent = await extractTextFromPDFBase64(file_b64);
			} else if (file.type === "text/plain" || file.type === "text/html" || file.type === "application/json" || file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
				fileContent = atob(file_b64);
			} else {
				throw new Error("Unsupported file type");
			}
      
			return {
				content: fileContent,
				name: file.name,
				createdDate: file.lastModified,
				type: file.type
			};
		});

		const newFiles = await Promise.all(uploadPromises);

		setFiles?.(files ? [...files, ...newFiles] : [...newFiles]);
		storeFiles(files ? [...files, ...newFiles] : [...newFiles]);
		makeOrgans()
		makeInsight("files", JSON.stringify([...newFiles]))
		setLoading(false);
	};

	const toBase64 = (file: any) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				// Extracting only the Base64 encoded string
				// @ts-ignore
				const base64String = reader.result.replace(/^data:.+;base64,/, ""); // @ts-nocheck
				resolve(base64String);
			};
			reader.onerror = (error) => reject(error);
		});

	const handleRemoveFile = (index: number) => {
		const newFiles = files.filter((_, i) => i !== index);
		setFiles(newFiles);
		storeFiles(newFiles);
	};

	const handleDragOver = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: any) => {
		e.preventDefault();
		setIsDragging(false);
	};


	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (loading) {
			toast("Please wait for the current upload.");
			return;
		}
  
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files);
			const allowedFiles = selectedFiles.filter((file) => 
				file.type === "application/pdf" || 
        file.type === "text/plain" ||
        file.type === "text/html" ||
        file.type === "application/json" ||
        file.type === "text/csv" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			);
  
			if (allowedFiles.length === 0) {
				toast("Please select only PDF, TXT, HTML, JSON, CSV or XLSX files.");
				return;
			}
  
			await uploadFiles(allowedFiles);
		}
	};
  
	const handleDrop = async (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
  
		if (loading) {
			toast("Please wait for the current upload.");
			return;
		}
  
		if (e.dataTransfer.files) {
			const selectedFiles: any = Array.from(e.dataTransfer.files);
			const allowedFiles = selectedFiles.filter((file: File) => 
				file.type === "application/pdf" ||
        file.type === "text/plain" ||
        file.type === "text/html" ||
        file.type === "application/json" ||
        file.type === "text/csv" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			);
  
			if (allowedFiles.length === 0) {
				toast("Please drop only PDF, TXT, HTML, JSON, CSV or XLSX files.");
				return;
			}
  
			await uploadFiles(allowedFiles);
		}
	};

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onDragLeave={handleDragLeave}
			className="ml-4 bg-transparent flex h-[calc(100vh-64px)]"
		>
			<div
				className={`bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-1 flex-col items-start p-4 gap-2 overflow-x-hidden ${
					isDragging ? "opacity-80" : "opacity-100"
				}`}
			>
				<div className="flex w-full flex-1 overflow-y-auto overflow-x-hidden pr-1">
					<div className="flex flex-col w-full flex-1 overflow-auto pr-1">
						{!files.length ? (
							<div className="items-center justify-center flex flex-1">
								<LabsEmptyState loading={loading} onFileChange={onFileChange} />
							</div>
						) : (
							<div className="p-8 flex flex-1 flex-col">
								<div className="font-bold text-2xl text-white mb-8">
                  Your files
								</div>
								<div className="flex w-full flex-wrap gap-2">
									{files.map(
										(
											file: FileType,
											index
										) => (
											<FileTag
												key={file.name}
												thisFile={file}
												handleRemoveFile={() => handleRemoveFile(index)}
											/>
										)
									)}
									<SkeletonFileTag
										loading={loading}
										onFileChange={onFileChange}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Labs;
