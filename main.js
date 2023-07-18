const resultado = document.getElementById("resultado");
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // levanto los inputs
  //  const group = document.getElementById("group").value;
  //  const source_system = document.getElementById("source_system").value;
  //  const source_attr = document.getElementById("source_attr").value;
  //  const source_value = document.getElementById("source_value").value;
  //  const target_system = document.getElementById("target_system").value;
  const mapBm = document.getElementById("mapBm").value 
  console.log('mapBm original', mapBm)

  const matches = mapBm.match(/"(.*?)"/g); // busca coincidencias de texto entre comillas dentro de una cadena.
  const values = matches.map((match) => match.replace(/"/g, "")); // elimina comillas dobles de cada coincidencia encontrada en el array matches.
  console.log('matches ', matches)
  console.log('values ', values)

  //...
  const fechaActual = new Date();

  const dia = String(fechaActual.getDate()).padStart(2, '0');
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
  const anio = fechaActual.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${anio}`;


 // mapBm:getValue("GENERAL", "TOA", "company", "defaultCompany", "AMDOCS")

  
  resultado.innerHTML = `
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
            &lt;amd:defaultValue&gt;string&lt;/amd:defaultValue&gt;
          &lt;/amd:getValueWithDefault&gt;
        </pre>
      </div>
      <div>
        <h2>Resultado para SELECT:</h2>
        <pre>
        select * from ESB_MAP where group_map='${values[0]}' and source_system='${values[1]}' and source_attr='${values[2]}' and source_value='${values[3]}' and target_system='${values[4]}' and target_attr='INSERTE VALOR CORRECTO DE target_attr';
        </pre>
      </div>
      <div>
        <h2>Resultado para INSERT:</h2>
        <pre>
          insert into ESB_MAP (ID, SOURCE_SYSTEM, SOURCE_ATTR, SOURCE_VALUE, TARGET_SYSTEM, TARGET_ATTR, TARGET_VALUE, GROUP_MAP, CREATED) values (SEQ_esb_map.NextVal,'${values[1]}','${values[2]}','${values[3]}','${values[4]}','INSERTAR VALOR DE SELECT','INSERTAR VALOR DE SELECT','${values[0]}',to_date('${fechaFormateada}','DD/MM/RRRR'));
        </pre>
      </div>
    </div>
  `;
});


// select * from ESB_MAP where group_map='${values[0]}' and source_system='${values[1]}' and source_attr='${values[2]}' and source_value='${values[3]}' and target_system='${values[4]}' and target_attr='${values[3]}'; 
