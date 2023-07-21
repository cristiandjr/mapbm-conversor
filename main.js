const resultado = document.getElementById("resultado");
const formulario = document.getElementById("formulario");



  // comillas dobles
  // mapBm:getValue("GENERAL", "TOA", "company", "defaultCompany", "AMDOCS")
  // mapBm:getValueWithDefault("AVERIAS", "CRM", "PRIORITY", $sourceBPT, "TOA", "0")

  // comillas simples
  // mapBm:getValue('GENERAL', 'TOA', 'company', 'defaultCompany', 'AMDOCS')


formulario.addEventListener("submit", (e) => {
  e.preventDefault();


  // levanto los inputs
  const mapBm = document.getElementById("mapBm").value 
  console.log('mapBm original', mapBm)

  if (mapBm.includes('getValueWithDefault')) {
    console.log('Encontrado: getValueWithDefault', mapBm.includes('getValueWithDefault'));
  } else if (mapBm.includes('getValue')) {
    console.log('Encontrado: getValue', mapBm.includes('getValue'));
  } else {
    console.log('Texto no encontrado.');
  }

  

  const matches = mapBm.match(/"(.*?)"|'(.*?)'/g); // busca coincidencias de texto entre comillas simples o dobles dentro de una cadena.
  const values = matches.map((match) => match.replace(/["']/g, "")); // elimina comillas simples o dobles de cada coincidencia encontrada en el array matches.
  //  console.log('matches ', matches)
  //  console.log('values ', values)

  //...
  const fechaActual = new Date();

  const dia = String(fechaActual.getDate()).padStart(2, '0');
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
  const anio = fechaActual.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${anio}`;

  resultado.innerHTML = ''
  
  resultado.innerHTML += `
    <div class="resultado">
      <div>
        <h2>Resultado para Request:</h2>
        <pre class="code">
          &lt;amd:getValueWithDefault xmlns:amd="http://www.movistar.com.ar/ws/schema/amdocs"&gt;
            &lt;amd:source_system&gt;${values[1]}&lt;/amd:source_system&gt;
            &lt;amd:source_attr&gt;${values[2]}&lt;/amd:source_attr&gt;
            &lt;amd:target_system&gt;${values[4]}&lt;/amd:target_system&gt;
            &lt;amd:source_value&gt;${values[3]}&lt;/amd:source_value&gt;
            &lt;amd:group&gt;${values[0]}&lt;/amd:group&gt;
            &lt;amd:defaultValue&gt;${values[5] == undefined ? 'string' : values[5]}&lt;/amd:defaultValue&gt;
          &lt;/amd:getValueWithDefault&gt;
        </pre>
      </div>
      <div class="code">
        <h2>Resultado para SELECT:</h2>
        <pre>
        select * from ESB_MAP where group_map='${values[0]}' and source_system='${values[1]}' and source_attr='${values[2]}' and source_value='${values[3]}' and target_system='${values[4]}' and target_attr='INSERTE VALOR CORRECTO DE target_attr';
        </pre>
      </div>
      <div class="code">
        <h2>Resultado para INSERT:</h2>
        <pre>
          insert into ESB_MAP (ID, SOURCE_SYSTEM, SOURCE_ATTR, SOURCE_VALUE, TARGET_SYSTEM, TARGET_ATTR, TARGET_VALUE, GROUP_MAP, CREATED) values (SEQ_esb_map.NextVal,'${values[1]}','${values[2]}','${values[3]}','${values[4]}','INSERTAR VALOR DE TARGET_ATTR','INSERTAR VALOR DE TARGET_VALUE','${values[0]}',to_date('${fechaFormateada}','DD/MM/RRRR'));
        </pre>
      </div>
    </div>
  `;
});


// select * from ESB_MAP where group_map='${values[0]}' and source_system='${values[1]}' and source_attr='${values[2]}' and source_value='${values[3]}' and target_system='${values[4]}' and target_attr='${values[3]}'; 


// el select es igual y el request tmb
//  <amd:source_system>AMDOCS</amd:source_system>
//  <amd:source_attr>toa_priority</amd:source_attr>
//  <amd:target_system>TOA</amd:target_system>
//  <amd:source_value>string</amd:source_value>
//  <amd:group>GENERAL</amd:group>
//  <amd:defaultValue>9</amd:defaultValue>


// ====================================================== DBA Conversor




function generateSQLQueries() {
  const sqlQueriesTextarea = document.getElementById("sqlQueries");
  const sqlQueries = sqlQueriesTextarea.value.split(";"); 

  let result = "";

  for (const sqlQuery of sqlQueries) {
    if (sqlQuery.trim() !== "") {
      result += generateSQLQuery(sqlQuery.trim()) + ";\n"; 
    }
  }

  const sqlResultTextarea = document.createElement("textarea");
  sqlResultTextarea.rows = "10";
  sqlResultTextarea.cols = "100";
  sqlResultTextarea.value = result;


  sqlQueriesTextarea.replaceWith(sqlResultTextarea);
}

function generateSQLQuery(sqlQuery) {
  const currentDate = new Date().toLocaleDateString("en-GB"); 
  const ID = "SEQ_esb_map.NextVal"; 


  return sqlQuery.replace(/to_date\('\d+\/\d+\/\d+'\,'DD\/MM\/RRRR'\)/g, `to_date('${currentDate}','DD/MM/RRRR')`)
                 .replace(/'\d+'(?=\s*,)/g, ID); 
}