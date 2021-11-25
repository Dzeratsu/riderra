<?php

switch ( $_GET['action'] ) {
	case 'sendBooking' :
		sendBooking();
		break;
	case 'updateBooking' :
		updateBooking();
		break;
	case 'getPrice' :
		getPrice();
		break;
}

function getPrice() {
	
	$data = array(
		'CompanyGUID'  => '8A40A59E-A822-449E-BA45-12866B357C1C',
		'CustomerGUID' => '64891ea8-52a9-4bc1-9b90-2f7d5e234b98',
		'Journey'      => 1,
		'Pickup'       =>
			array(
//				'Premise'  => 'Hilton Moscow Leningradskaya, Kalanchevskaya Ulitsa, Moscow, Russia',
//				'StreetNo' => '24',
//				'Street'   => 'Kalanchevskaya Ulitsa',
//				'Town'     => 'Moscow',
//				'Postcode' => '107078',
				'Country'  => 'Russia',
				'Lat'      => 55.774054,
				'Long'     => 37.651794
			),
		'Dropoff'      =>
			array(
//				'Premise'  => 'Шереметьево - аэропорт имени А.С. Пушкина, Khimki, Russia',
//				'StreetNo' => '23',
//				'Street'   => 'Шереметьево - аэропорт имени А.С. Пушкина',
//				'Town'     => 'Khimki',
//				'Postcode' => '141400',
				'Country'  => 'Russia',
				'Lat'      => 55.963943,
				'Long'     => 37.416924
			),
		
		//'IsOpenDest' => 'string',
	);
	
	$curlOptions = array(
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_HEADER         => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_URL            => 'https://api-ivcardobooking.azurewebsites.net:80/api/Booking/GetServiceTypesWithPrice',
		CURLOPT_POSTFIELDS     => json_encode( $data ),
		CURLOPT_CUSTOMREQUEST  => 'POST',
		CURLOPT_HTTPHEADER     => array(
			'Content-Type: application/json ; charset=UTF-8',
			"ClientId: c0e1e4cc-4140-46ca-b761-4942afbb90d0",
			"ClientSecret: 1584"
		)
	);
	
	$curl = curl_init();
	curl_setopt_array( $curl, $curlOptions );
	$out = curl_exec( $curl );
	curl_close( $curl );
	echo '<pre>';
	echo $out;
	echo '</pre>';
	die();
	
	// ef93e3bb-8d37-4933-af79-d38554fc99d3 pay in wechine
	
}

function updateBooking() {
	
	$id = $_GET['id'];
	
	$data = array(
		'id'     => $id,
		'pNotes' => 'paid',
		
		
		'CompanyGUID'            => '8A40A59E-A822-449E-BA45-12866B357C1C',
		'CustomerGUID'      => '64891ea8-52a9-4bc1-9b90-2f7d5e234b98',
		'BookingRef'      => 'RIDERRA_REFERENCE_HERE',
		'journey'         => 1,
		'pHours'          => 0,
		'pService'        => 'SEDAN',
		'VehicleAgeLimit' => 1,
		'pDate'           => '2020-02-15 06:04:00',
		'pPremise'        => 'Boston Public Market, Hanover Street, Boston, MA, USA',
		
		'pLat'     => '42.3622119',
		'pLong'    => '-71.0575348',
		'dPremise' => 'Boston Public Market, Hanover Street, Boston, MA, USA',
		
		'dLat'       => '42.3622119',
		'dLong'      => '-71.0575348',
		'Passengers' => array(
			0 => array(
				'pName'   => 'Test',
				'pPrefix' => '1',
				'pPhone'  => '9052339904',
				'pEmail'  => 'test@gmail.com',
			),
		),
		'NoOfCases'  => '1',
		'pNotes'     => 'Booking instruction',
		'pPrice'     => '55.80',
		'pTime'      => '25',
		'pPassenger' => '3',
	
	);
	
	$data['CompanyGUID']       = '8A40A59E-A822-449E-BA45-12866B357C1C';
	$data['CustomerGUID'] = '64891ea8-52a9-4bc1-9b90-2f7d5e234b98';
	$data['BookingRef'] = 'RIDERRA_REFERENCE_HERE';
	
	$curlOptions = array(
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_HEADER         => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_URL            => 'https://api-ivcardobooking.azurewebsites.net:80/api/Booking/UpdateBooking',
		CURLOPT_POSTFIELDS     => json_encode( $data ),
		CURLOPT_CUSTOMREQUEST  => 'POST',
		CURLOPT_HTTPHEADER     => array(
			'Content-Type: application/json ; charset=UTF-8',
			"ClientId: c0e1e4cc-4140-46ca-b761-4942afbb90d0",
			"ClientSecret: 1584"
		)
	);
	
	$curl = curl_init();
	curl_setopt_array( $curl, $curlOptions );
	$out = curl_exec( $curl );
	curl_close( $curl );
	echo json_encode( $out );
	die();
	
}

function sendBooking() {
	
	$post = json_decode( file_get_contents( 'php://input' ), true );
	$data = array_map( 'htmlspecialchars', $post );
	
	/*
	$data = array(
		'CompanyGUID'            => '8A40A59E-A822-449E-BA45-12866B357C1C',
		'CustomerGUID'      => '64891ea8-52a9-4bc1-9b90-2f7d5e234b98',
		'BookingRef'      => 'RIDERRA_REFERENCE_HERE',
		'journey'         => 1,
		'pHours'          => 0,
		'pService'        => 'SEDAN',
		'VehicleAgeLimit' => 1,
		'pDate'           => '2020-02-15 06:04:00',
		'pPremise'        => 'Boston Public Market, Hanover Street, Boston, MA, USA',
//		'pStreetNo'       => '100',
//		'pStreet'         => 'Hanover Street',
//		'pTown'           => 'Boston',
//		'pCounty'         => 'Suffolk County',
//		'pPostcode'       => '02108',
//		'pCountry'        => 'USA',
//		'pIATA'           => 'JFK',
//		'pFlightNumber'   => 'AA848',
//		'pAddressNote'    => 'pickup address instruction',
		'pLat'            => '42.3622119',
		'pLong'           => '-71.0575348',
		'dPremise'        => 'Boston Public Market, Hanover Street, Boston, MA, USA',
//		'dStreetNo'       => '100',
//		'dStreet'         => 'Hanover Street',
//		'dTown'           => 'Boston',
//		'dCounty'         => 'Suffolk County',
//		'dPostcode'       => '02108',
//		'dCountry'        => 'US',
//		'dIATA'           => '',
//		'dFlightNumber'   => '',
//		'dAddressNote'    => 'destination address instruction',
		'dLat'            => '42.3622119',
		'dLong'           => '-71.0575348',
		'Passengers'      => array(
			0 => array(
				'pName'   => 'Test',
				'pPrefix' => '1',
				'pPhone'  => '9052339904',
				'pEmail'  => 'test@gmail.com',
			),
		),
		'NoOfCases'       => '1',
		'pNotes'          => 'Booking instruction',
		'pPrice'          => '55.80',
		'pTime'           => '25',
		'pPassenger'      => '3',
	);
	*/
	
	$data['CompanyGUID']       = '8A40A59E-A822-449E-BA45-12866B357C1C';
	$data['CustomerGUID'] = '64891ea8-52a9-4bc1-9b90-2f7d5e234b98';
	$data['BookingRef'] = 'RIDERRA_REFERENCE_HERE';
	
	$curlOptions = array(
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_HEADER         => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_URL            => 'https://api-ivcardobooking.azurewebsites.net:80/api/Booking/BookNow',
		CURLOPT_POSTFIELDS     => json_encode( $data ),
		CURLOPT_CUSTOMREQUEST  => 'POST',
		CURLOPT_HTTPHEADER     => array(
			'Content-Type: application/json ; charset=UTF-8',
			"ClientId: c0e1e4cc-4140-46ca-b761-4942afbb90d0",
			"ClientSecret: 1584"
		)
	);
	
	$curl = curl_init();
	curl_setopt_array( $curl, $curlOptions );
	$out = curl_exec( $curl );
	curl_close( $curl );
	echo json_encode( $out );
	die();
}
