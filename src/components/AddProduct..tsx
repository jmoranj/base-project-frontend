interface AddProductProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AddProduct({ isOpen, onClose }: AddProductProps) {
	return (
		<div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} justify-center items-center bg-black bg-opacity-50`}>
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-600">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Adiocionar um novo registro
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={onClose}
						>
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
						</button>
					</div>
					<form className="p-4 md:p-5">
						<div className="grid gap-4 mb-4 grid-cols-2">
							<div className="col-span-2">
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
								<input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Digite o nome do produto" required />
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço</label>
								<input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria extrato</label>
								<select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
									<option selected>Selecionar categoria</option>
									<option value="TV">Saída</option>
									<option value="TV">Entrada</option>
								</select>
							</div>
						</div>
						<button type="submit" className="text-white inline-flex items-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring--800">
							<svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
							Adicionar
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
