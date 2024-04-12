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
import { TestType } from "./testsList";
import { Switch } from "@tremor/react";

const FormSchema = z.object({
	id: z.string({
		required_error: "Please add the test ID",
	}),
	name: z.string({
		required_error: "Please add a name",
	}),
	taken: z.boolean(),
	ordered: z.boolean(),
});

export const TestsAdd = ({
	onSubmit,
}: {
  onSubmit: (value: TestType) => void;
}): React.ReactNode => {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const handleSubmit = (value: z.infer<typeof FormSchema>) => {
		onSubmit({
			id: value.id,
			test_name: value.name,
			link: "",
			ordered: value.ordered,
			test_type: "",
			test_number: 0,
			taken: value.taken,
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
					<DialogTitle className="text-white">New test</DialogTitle>
					<DialogDescription className="text-gray-300">
			Add a new test to your list.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="w-2/3 space-y-3">
						<FormField
							control={form.control}
							name="id"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="text-white">Test ID</FormLabel>
									<Input
										onChange={field.onChange}
										defaultValue={field.value}
										placeholder="Test ID"
									/>
									{fieldState.error && (
										<p className="text-red-500">{fieldState.error.message}</p>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="text-white">Name</FormLabel>
									<Input
										onChange={field.onChange}
										defaultValue={field.value}
										placeholder="Test name"
									/>
									{fieldState.error && (
										<p className="text-red-500">{fieldState.error.message}</p>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ordered"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-white">Ordered</FormLabel>
									<Switch
										checked={field.value}
										onChange={(v) => field.onChange(v)}
									/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="taken"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-white">Taken</FormLabel>
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
