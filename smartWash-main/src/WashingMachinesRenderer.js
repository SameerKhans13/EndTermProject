import {machinesArea} from "./DOMElements";

const map = [
	{
		name: "5th floor",
		rightMachines: ["open", "close", "open"],
		leftMachines: ["close", "close"],
	},
	{
		name: "Ground floor",
		rightMachines: ["open", "close"],
		leftMachines: ["close", "open"],
	}
];

const getOpenWashingMachine = () => {
	const container = document.createElement("div");
	for (const _ in ["flex", "flex-col", "items-center", "justify-center"]) {
		container.classList.add(_);
	}

	const image = document.createElement("img");
	image.src = "res/open_state.png";
	image.setAttribute("draggable", "false");
	image.classList.add("w-20");
	image.classList.add("h-20");
	image.classList.add("select-none");

	const desc = document.createElement("h3");
	desc.innerText = "OPEN";
	desc.classList.add("text-center");
	desc.classList.add("font-bold");
	desc.classList.add("text-green-600");

	container.appendChild(image);
	container.appendChild(desc);

	return container;
}

const getClosedWashingMachine = () => {
	const container = document.createElement("div");
	for (const _ in ["flex", "flex-col", "items-center", "justify-center"]) {
		container.classList.add(_);
	}

	const image = document.createElement("img");
	image.src = "res/close_state.png";
	image.setAttribute("draggable", "false");
	image.classList.add("w-20");
	image.classList.add("h-20");
	image.classList.add("select-none");

	const desc = document.createElement("h3");
	desc.innerText = "AT WORK";
	desc.classList.add("text-center");
	desc.classList.add("font-bold");
	desc.classList.add("text-red-500");

	container.appendChild(image);
	container.appendChild(desc);

	return container;
}

const showMachines = (machine) => {
	machine.classList.add("flex");
	machine.classList.remove("hidden");
	machine.dataset.visible = "true";
}

const hideMachines = (machine) => {
	machine.classList.add("hidden");
	machine.classList.remove("flex");
	machine.dataset.visible = "false";
}

const WashingMachinesRenderer = () => {
	for (let i = 0; i < map.length; i++) {
		const area = map[i];
		const machineContainerCode = `
<div id="machine-container-${i}" class="relative w-full p-2 rounded-sm flex flex-col justify-center items-center">
	<div class="flex flex-row w-full bg-blue-400 px-2 rounded-sm items-center">
		<h1 id="machine-heading" class="grow-1">
				${area.name}
		</h1>
		<i class="fa-solid fa-caret-down machines-toggle-btn"></i>
	</div>
	<div class="machines-view flex flex-row gap-12 mt-4" data-visible="true">
		<div id="machines-left" class="flex flex-col gap-1">
		</div>
		<div id="machines-right" class="flex flex-col gap-1">
		</div>
	</div>
</div>
`
		machinesArea.innerHTML += machineContainerCode;
		const currentMachine = document.querySelector(`#machine-container-${i}`);
		const leftMachines = currentMachine.querySelector("#machines-left");
		const rightMachines = currentMachine.querySelector("#machines-right");

		for (let i = 0; i < area.leftMachines.length; i++) {
			const machineState = area.leftMachines[i];
			const machine = machineState === "open" ? getOpenWashingMachine() : getClosedWashingMachine();

			leftMachines.appendChild(machine);
		}

		for (let i = 0; i < area.rightMachines.length; i++) {
			const machineState = area.rightMachines[i];
			const machine = machineState === "open" ? getOpenWashingMachine() : getClosedWashingMachine();

			rightMachines.appendChild(machine);
		}
	}

	const allMachineToggleBtns = document.querySelectorAll(".machines-toggle-btn");
	for (const btn of allMachineToggleBtns) {
		btn.addEventListener("click", () => {
			const machine = btn.parentElement.parentElement;
			const machinesView = machine.querySelector(".machines-view");

			if (machinesView.dataset.visible === "true") {
				hideMachines(machinesView);
				btn.classList.remove("fa-caret-down");
				btn.classList.add("fa-caret-up");
			} else {
				showMachines(machinesView);
				btn.classList.remove("fa-caret-up");
				btn.classList.add("fa-caret-down");
			}
		})
	}
}

export default WashingMachinesRenderer;
