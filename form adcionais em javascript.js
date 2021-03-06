    console.log ("Javascript carregado");
    // Validação CPF 
    
    const strCPF = document.getElementById("cpf").value;
    const input = document.querySelector("input");
    
    function ValidaCPF(){	
        var cpf=document.getElementById("cpf").value; 
        var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
        const span = document.getElementById("erro-cpf");
         
        if (cpfValido.test(cpf) == false)	{ 
            span.innerHTML = "Digite um CPF válido";
            span.style.marginTop = "8px"
        }
    }
    
    
    function fMasc(objeto,mascara) {
    obj=objeto
    masc=mascara
    setTimeout("fMascEx()",1)
    }
    
    function fMascEx() {
    obj.value=masc(obj.value)
    }
    
    function mCPF(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
    }
    
    function mCEP(cep){
        cep=cep.replace(/\D/g,"")
        cep=cep.replace(/^(\d{2})(\d)/,"$1.$2")
        cep=cep.replace(/\.(\d{3})(\d)/,".$1-$2")
        return cep
    }
        
    // Validação do CEP
    function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value = ("");
        document.getElementById('bairro').value = ("");
        document.getElementById('cidade').value = ("");
        document.getElementById('uf').value = ("");
    }
    
    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value = (conteudo.logradouro);
            document.getElementById('bairro').value = (conteudo.bairro);
            document.getElementById('cidade').value = (conteudo.localidade);
            document.getElementById('uf').value = (conteudo.uf);
    
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
    
            //TODO Mudar para html
            alert("CEP não encontrado.");
        }
    }
    
    function pesquisacep(valor) {
    
        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');
    
        //Verifica se campo cep possui valor informado.
        if (cep != "") {
    
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;
    
            //Valida o formato do CEP.
            if (validacep.test(cep)) {
    
                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('uf').value = "...";
    
    
                //Cria um elemento javascript.
                var script = document.createElement('script');
    
                //Sincroniza com o callback.
                const url = 'https://viacep.com.br/ws/' + cep + '/json';
                fetch(url)
                    .then((response) => response.json())
                    .then((body) => meu_callback(body))
    
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    }
