import { useState } from "react";
import { getFiles, storeFiles } from "src/helpers/storage";
import { LabsEmptyState } from "./EmptyState";
import * as PDFJS from "pdfjs-dist";
// @ts-ignore
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";
import FileTag from "src/components/chat/FileTag";
import { SkeletonFileTag } from "src/components/SkeletonFileTag";
import { ModuleContainer } from "src/components/Containers";

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
	const [files, setFiles] = useState<
    {
      name: string;
      content: string;
      createdDate: number;
    }[]
  >(getFiles());
	const [isDragging, setIsDragging] = useState(false);
	const [loading, setLoading] = useState(false);

	const uploadFiles = async (filesToUpload: File[]) => {
		setLoading(true);
		const uploadPromises = filesToUpload.map(async (file) => {
			const file_b64: any = await toBase64(file);
			const fileContent = await extractTextFromPDFBase64(file_b64);
			return {
				content: fileContent,
				name: file.name,
				createdDate: file.lastModified,
			};
		});

		const newFiles = await Promise.all(uploadPromises);

		setFiles?.(files ? [...files, ...newFiles] : [...newFiles]);
		storeFiles(files ? [...files, ...newFiles] : [...newFiles]);
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

	const handleDrop = async (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		if (loading) {
			alert("Please wait for the current upload.");
		}

		if (e.dataTransfer.files) {
			const selectedFiles: any = Array.from(e.dataTransfer.files);
			if (selectedFiles.length === 0) {
				alert("Invalid file type.");
				return;
			}
			await uploadFiles(selectedFiles);
		}
	};

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (loading) {
			alert("Please wait for the current upload.");
		}

		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files);
			if (selectedFiles.length === 0) {
				alert("Invalid file type.");
				return;
			}
			await uploadFiles(selectedFiles);
		}
	};

	return (
		<ModuleContainer>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onDragLeave={handleDragLeave}
				className={`flex flex-1 w-full ${
					isDragging ? "opacity-80" : "opacity-100"
				}`}
			>
				<div className="flex flex-col w-full flex-1 overflow-auto pr-1">
					{!files.length ? (
						<div className="self-center items-center justify-center flex flex-col flex-1">
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
										file: {
                      name: string;
                      content: string;
                      createdDate: number;
                    },
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
		</ModuleContainer>
	);
};

export default Labs;
