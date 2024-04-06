const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credentiais.json'); // chave para minha conta de serviço
const arquivo = require('./file.json'); // armazena o ID da minha planilha
const getDoc = async () => {
    const doc = new GoogleSpreadsheet(arquivo.id);
    
    await doc.useServiceAccountAuth({
        client_email: credenciais.client_email,
        private_key: credenciais.private_key.replace(/\\n/g, '\n')
    })
    await doc.loadInfo();
    return doc;
}
getDoc().then(doc => {
    console.log(doc.title);
});