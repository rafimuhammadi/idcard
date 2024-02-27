<?php
return [
	'mode' => 'utf-8',
	'format' => 'A4',
	'author' => 'Rafi Muhammadi',
	'subject' => 'Generate Data in to PDF',
	'keywords' => 'PDF, Laravel, Package, Peace',
	'creator' => 'Laravel Pdf',
	'display_mode' => 'fullpage',
	'tempDir' => base_path('storage/app/mpdf'),
	'pdf_a' => false,
	'pdf_a_auto' => false,
	'icc_profile_path' => '',
	// Adding Customizie Font Family.
	'font_path' => base_path('public/assets/font'),
	'font_data' => [
		'bahijfont' => [
			'R' => 'bahij.ttf',  // regular font
			'useOTL' => 0xFF,    //  required for complicated langs like Persian, Arabic and Chinese
			'useKashida' => 75, //   required for complicated langs like Persian, Arabic and Chinese
			'unAGlyphs' => true,
		]
	]
];