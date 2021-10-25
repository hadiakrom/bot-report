// setting report id untuk tanggal kemarin
//console.clear();
var today = moment(new Date().toJSON().slice(0,10))._i;
today = moment(today,"YYYY-MM-D").format("YYYY-MM-DD");
console.log(today);
var temp_id = today.split('-');
temp_id[2] = temp_id[2] -1;
var report_id = temp_id.join('');
// console.log('report_id : '+report_id)
var local_data = window.localStorage;
//console.log(local_data);
//console.log(local_data.length)
// cek apakah report kemarin ada di local localStorage
var x = local_data.getItem('data');
var y = null;
if (x!=null){y=JSON.parse(x)[0]}; // if x != null then y = local_id
//console.log('x = '+x);
//console.log('y = '+y);
if (x==null || y!=report_id){
//console.log('asu')
    load_from_database();
}else{
 // console.log('bangsat')
    load_raptor_data();
};

//console.log(local_report_id);


// memulai loding data
async function load_from_database(){
  //console.log('remove data');
  //localStorage.setItem('data',undefined)
  //localStorage.clear();
  //localStorage.removeItem('data');
  
  console.log(localStorage)
  console.log('  --  loding data from database  --  ');
  var raptor_url = 'https://script.google.com/macros/s/AKfycby6Y2wgQpuj77RwJ3YsNeHAeqr_t7pjLqXnGfLhu0CIMFTHgqhzqZfflsRu4tipRp1z/exec'
  var raptor_json;
  await fetch(raptor_url).then(await function(response){
//    console.log(response.text);
    response.text().then(function(text){
//    console.log(text);
    var raptor_json = JSON.parse(text);
//    console.log('raptor_json')
//    console.log(raptor_json);
  // simpan data dari server ke localStorage
//    console.log('-- menyimpan data ke local --');
    window.localStorage.setItem('data',JSON.stringify(raptor_json));
    load_raptor_data();
    });
  });
};

function load_raptor_data(){
  console.log('  --  Loading data ke halaman report  --  ')
  var raptor_data = JSON.parse(window.localStorage.getItem('data'));
  console.log(raptor_data)
  //console.log(window.localStorage.getItem('data'));
  //console.log('raptor_data')
  //console.log(raptor_data);
  /* list of element 
    val_total_boxes      [2]
    val_hunting_date     [1]
    val_hunter_name      [3]
    val_hunting_score    [4]
    val_monster_box      [5]
    val_monster_score    [6]
    val_purchased_box    [7]
    val_purchased_score  [8]
  */
  // Write array into element body
  document.getElementsByClassName('val_total_boxes')[0].innerHTML = raptor_data[2];
  document.getElementsByClassName('val_hunting_date')[0].innerHTML = raptor_data[1];
    //Formating date to dddd, D MM YYYY
    var oldDate =$('.val_hunting_date').text();
    var newDate = moment(oldDate,'DD/MM/YYYY' ).format('dddd, D MMM YYYY');
    $('.val_hunting_date').html(newDate);
  document.getElementsByClassName('val_hunter_name')[0].innerHTML = raptor_data[3];
  document.getElementsByClassName('val_hunting_score')[0].innerHTML = raptor_data[4];
  document.getElementsByClassName('val_monster_box')[0].innerHTML = raptor_data[5];
  document.getElementsByClassName('val_monster_score')[0].innerHTML = raptor_data[6];
  // change badge color base on value 
    if (raptor_data[6]>0){
      $('.val_monster_score').addClass('badge-success');
    }else{
      $('.val_monster_score').addClass('badge-danger');
    };
  document.getElementsByClassName('val_purchased_box')[0].innerHTML = raptor_data[7];
  document.getElementsByClassName('val_purchased_score')[0].innerHTML = raptor_data[8];
  // chane badge color base on value 
    if (raptor_data[6]>0){
      $('.val_purchased_score').addClass('badge-success');
    }else{
      $('.val_purchased_score').addClass('badge-danger');
    };
}