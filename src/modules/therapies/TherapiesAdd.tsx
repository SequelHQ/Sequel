import { PlusIcon } from "@radix-ui/react-icons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { TherapyItem } from "./therapiesList";
import { Switch } from "@tremor/react";

const FormSchema = z.object({
	label: z.string({
		required_error: "Please add the therapy name",
	}),
	uri: z.string().optional(),
	inProgress: z.boolean(),
});

export const TherapiesAdd = ({
	onSubmit,
}: {
	onSubmit: (value: TherapyItem) => void;
}): React.ReactNode => {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const handleSubmit = (value: z.infer<typeof FormSchema>) => {
		onSubmit({
			label: value.label,
			uri: value.uri ?? "",
			inProgress: value.inProgress,
		});
		setOpen(false);
	};

	return (
		<Dialog
			modal={true}
			open={open}
			onOpenChange={(open) => {
				setOpen(open);
				form.reset();
			}}
		>
			<DialogTrigger>
				<PlusIcon className="w-6 h-6 text-white" />
			</DialogTrigger>
			<DialogContent className="bg-[#161617] border-0">
				<DialogHeader>
					<DialogTitle className="text-white">New therapy</DialogTitle>
					<DialogDescription className="text-gray-300">
						Add a new therapy to your list.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="w-2/3 space-y-3"
					>
						<FormField
							control={form.control}
							name="label"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="text-white">Therapy label</FormLabel>
									<Input
										onChange={field.onChange}
										defaultValue={field.value}
										placeholder="Therapy label"
									/>
									{fieldState.error && (
										<p className="text-red-500">{fieldState.error.message}</p>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="uri"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="text-white">Uri</FormLabel>
									<Input
										onChange={field.onChange}
										defaultValue={field.value}
										placeholder="Therapy uri"
									/>
									{fieldState.error && (
										<p className="text-red-500">{fieldState.error.message}</p>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="inProgress"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-white">In progress</FormLabel>
									<Switch
										checked={field.value}
										onChange={(v) => field.onChange(v)}
									/>
								</FormItem>
							)}
						/>
						<Button
							style={{ marginTop: 24 }}
							className="bg-white"
							type="submit"
						>
							Add
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
