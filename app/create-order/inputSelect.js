"use client";

export default function InputSelect({
	inputName,
	inputId,
	itemList,
	setValues = null,
	values = null,
	getCombination = null,
}) {
	return (
		<div key={inputName} className="group flex flex-col grow w-auto">
			<select
				// name="cars"
				// id="cars"
				// form="carform"
				className="w-full
                        shadow-sm
                        bg-default-100
                        border-medium
                        border-default-200
                        data-[hover=true]:border-default-400
                        rounded-small
                        justify-center
                        h-12
                        !duration-150
                        transition-colors
                        motion-reduce:transition-none
                        outline-none
                        group-data-[focus-visible=true]:z-10
                        group-data-[focus-visible=true]:ring-2
                        group-data-[focus-visible=true]:ring-focus
                        group-data-[focus-visible=true]:ring-offset-2
                        group-data-[focus-visible=true]:ring-offset-background
                        py-1.5
                        px-3
                        group"
				onChange={(e) => {
					let newValues = [
						...values,
						{
							attribute: {
								id: e.target.options[e.target.selectedIndex].dataset.id,
								label: e.target.value,
							},
							group: {
								id: inputId,
								label: inputName,
							},
						},
					];

					// setValues(newValues);

					// console.log("values");
					// console.log(values);

					getCombination({
						attribute: {
							id: e.target.options[e.target.selectedIndex].dataset.id,
							label: e.target.value,
						},
						group: {
							id: inputId,
							label: inputName,
						},
					});
				}}>
				<option key={inputName} className="h-10" value="select">
					Selecciona - {inputName}
				</option>
				{itemList.map(({ key, label }) => (
					<option
						key={key}
						className="h-10"
						data-id={key}
						data-test="testtt"
						value={label}>
						{label} - {key}
					</option>
				))}
			</select>
		</div>
	);
}
