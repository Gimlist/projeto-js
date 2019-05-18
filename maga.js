var $ = function (seletor) {
	return {
		// element: cria o objeto de um novo elemento. Se houver "." no inicio ele gera um array de elementos de uma determinada classe, se houver um "#" no inicio ele gera um objeto doelemento pelo id. Caso não seja nenhuma das opções ele traz um objeto de retorno da tag.
		element: seletor.toString().indexOf(".") == 0 ? Array.from(document.getElementsByClassName(seletor.replace(".", ""))) : (seletor.toString().indexOf("#") == 0 ? document.getElementById(seletor.replace("#", "")) : Array.from(document.getElementsByTagName(seletor))),
		//val: Atribui um valor, ou busca o valor de texto de um elemento caso seja passado vazio.
		val: function (valor) {
			if (valor && valor.length > 0) {
				if (this.element.type == 'text')
					this.element.value = valor;
				else {
					this.element.innerText = valor;
				}
			}
			else {
				if (this.element.type == 'text')
					return this.element.value;
				else
					return this.element.innerText;
			}
		},
		//attr: adiciona novo atributo a um elemento, caso seja passado vazio, busca o valor do mesmo.
		attr: function (nome, valor) {
			if (!nome) {
				console.log("O nome do atributo é obrigatório");
				return;
			}

			if (valor) {
				this.element.setAttribute(nome, valor);
			}
			else {
				return this.element.getAttribute(nome);
			}

		},
		//hide: oculta determinado elemento
		hide: function (id) {
			this.element.style.display = "none";
		},
		//show: exibe determinado elemento
		show: function (id) {
			this.element.style.display = "inline-block";
		},
		//append: Cria elemento filho, quando passado tag e id, criando o objeto do elemento automaticamente. Também pode ser passado a classe que será adicionada ao elemento.
		append: function (tag, id, cssClass) {
			var child = document.createElement(tag);
			child.setAttribute("id", id);
			child.setAttribute("class", cssClass);
			this.element.appendChild(child);

			return $(`#${id}`);
		},
		//each: Retorna uma função que trata e retorna cada elemento de um array
		each: function (callback) {
			for (var i = 0; i < this.element.length; i++) {
				callback(this.element[i], i);
			}
		},
		//click: Função de click para determinado elemento
		click: function (funcao) {
			this.element.onclick = funcao;
		}
	};
};
