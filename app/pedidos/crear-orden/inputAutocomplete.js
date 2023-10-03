"use client";

export default function InputAutocomplete({
	inputComponent,
	possibilitiesList = [],
	setInputValue,
	setPossibilitesList,
    setProductCode = null,
    getProductById = null
}) {
	return (
		<div className="grow w-auto relative">
			{inputComponent}
			<div className="bg-white rounded-md w-full absolute z-30 max-h-60 overflow-y-scroll">
				<ul>
					{possibilitiesList.map((item) => (
						<li
							className="p-4 hover:bg-gray-100 cursor-pointer"
							onClick={() => {
								setInputValue(item.label);
								setPossibilitesList([]);
                                getProductById(item.key);
                                if (setProductCode) {
                                    setProductCode(item.key);
                                };
							}}
							key={item.key}>
							{item.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
