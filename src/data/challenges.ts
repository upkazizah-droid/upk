import { Challenge } from '../types/game';
import sceneCyber from '../assets/images/scene_cyber_conflict_1791856705363.jpg';
import sceneHostel from '../assets/images/scene_hostel_dorm_1791856704677.jpg';
import sceneCanteen from '../assets/images/scene_school_canteen_1791856705488.jpg';
import sceneBurnout from '../assets/images/scene_study_burnout_1791856706477.jpg';
import sceneCounseling from '../assets/images/scene_counseling_room_1791856706549.jpg';

export const SCENE_CYBER = sceneCyber;
export const SCENE_HOSTEL = sceneHostel;
export const SCENE_CANTEEN = sceneCanteen;
export const SCENE_BURNOUT = sceneBurnout;
export const SCENE_COUNSELING = sceneCounseling;

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Grup WhatsApp Kelas: Penyebaran Gambar Aib',
    category: 'Buli Siber',
    dangerLevel: 'Tinggi',
    themeColor: 'cyan',
    imageSrc: SCENE_CYBER,
    situation: 'Jam 11:30 malam, seorang rakan kelas memuat naik gambar aib seorang pelajar lain yang diambil tanpa izin ketika dia sedang tertidur dengan keadaan mengaibkan. Beberapa ahli grup mula menghantar stiker mengejek, mentertawakannya, dan mencabar ahli lain untuk menambah ejekan atau berkongsi ke grup luar.',
    innerMonologue: '"Kalau aku diam membisu, maruah kawan aku hancur esok."',
    choices: [
      {
        id: '1a',
        text: 'Hantar satu stiker ketawa kecil secara bersahaja supaya tidak dianggap poyo atau sombong oleh rakan-rakan sekelas.',
        isCorrect: false,
        consequence: 'Tindakan ini menyemarakkan budaya buli siber. Walaupun sekadar stiker kecil, anda menjadi sebahagian daripada pemangsa yang meremukkan harga diri mangsa.',
        boldTakeaway: 'Ketawa bersama pemangkin buli menjadikan anda penyubahat jenayah siber yang menghancurkan mental rakan sekelas.',
        psychologicalImpact: 'Menormalisasikan keganasan digital dan menghakis integriti moral kendiri.'
      },
      {
        id: '1b',
        text: 'Tekan butang "Keluar Grup" serta-merta tanpa bercakap apa-apa, kemudian padam aplikasi kerana tidak mahu terlibat dalam masalah.',
        isCorrect: false,
        consequence: 'Melarikan diri secara pasif mungkin menenangkan fikiran anda sejenak, namun ia membiarkan buli terus berleluasa dan mengasingkan anda tanpa melindungi mangsa yang berada dalam bahaya.',
        boldTakeaway: 'Sikap berpeluk tubuh membiarkan kezaliman berlaku tanpa bantuan, menjadikan mangsa merasa bersendirian tanpa harapan.',
        psychologicalImpact: 'Menanam sikap tidak peduli sivik dan rasa bersalah yang berpanjangan.'
      },
      {
        id: '1c',
        text: 'Ambil tangkap layar (screenshot) sebagai bukti, nyatakan secara tegas di grup bahawa perbuatan itu salah & melanggar undang-undang, serta segera hantar mesej sokongan kepada mangsa dan maklumkan kepada Guru Kaunseling esok pagi.',
        isCorrect: true,
        consequence: 'Tindakan wira sebenar. Anda mematahkan rantaian buli siber, melindungi mangsa daripada trauma berpanjangan, dan mempamerkan integriti seorang pemimpin berprinsip.',
        boldTakeaway: 'Menjadi saksi aktif (upstander) dengan bukti kukuh dan sokongan empati menyelamatkan nyawa dan masa depan rakan anda.',
        psychologicalImpact: 'Membina benteng psikologi yang selamat bagi komuniti dan memperkukuh keberanian moral.'
      }
    ]
  },
  {
    id: 2,
    title: 'Kecaman Akaun Palsu di Media Sosial',
    category: 'Buli Siber',
    dangerLevel: 'Tinggi',
    themeColor: 'rose',
    imageSrc: SCENE_CYBER,
    situation: 'Sebuah akaun rahsia tanpa nama (anonymous confession) di TikTok dan Instagram memuat naik fitnah liar tentang peribadi anda, mendakwa anda bersikap hipokrit dan menggunakan jalan pintas untuk lulus ujian. Postingan tersebut mendapat lebih 500 tanda suka dan ratusan komen toksik dari pelajar sekolah anda.',
    innerMonologue: '"Fitnah ni semakin liar, aku mesti bertenang dan kumpul bukti."',
    choices: [
      {
        id: '2a',
        text: 'Cipta akaun palsu balas untuk menyerang balik individu yang disyaki, menggunakan kata-kata kesat dan mendedahkan rahsianya sebagai balas dendam.',
        isCorrect: false,
        consequence: 'Perang siber ini hanya membesarkan skandal dan meletakkan anda di tahap moral yang sama rendah dengan pemfitnah, bahkan anda boleh dikenakan tindakan disiplin dan undang-undang Akta Komunikasi.',
        boldTakeaway: 'Membalas kejahatan dengan fitnah balas hanya membakar diri sendiri dan memanjangkan kitaran toksik.',
        psychologicalImpact: 'Meningkatkan tahap hormon kortisol (tekanan), keresahan kronik dan memusnahkan reputasi diri.'
      },
      {
        id: '2b',
        text: 'Pendam rasa sedih, kurung diri dalam bilik gelap menangis, dan buat keputusan untuk ponteng sekolah selama seminggu kerana malu berhadapan dengan rakan.',
        isCorrect: false,
        consequence: 'Mengasingkan diri memberi kemenangan psikologi percuma kepada pembuli. Pelajaran anda terabai, manakala khabar angin semakin tidak terkawal tanpa penjelasan sahih.',
        boldTakeaway: 'Mengelak realiti dan memendam emosi menjerumuskan diri ke dalam jurang kemurungan yang membahayakan nyawa.',
        psychologicalImpact: 'Menyebabkan penurunan drastik self-worth dan meningkatkan risiko depresi klinikal.'
      },
      {
        id: '2c',
        text: 'Jangan layan provokasi komen; simpan tangkap layar tarikh/pautan akaun, sekat (block) & lapor (report) kepada pihak platform, kemudian kongsikan insiden ini kepada ibu bapa dan Guru Bimbingan & Kaunseling.',
        isCorrect: true,
        consequence: 'Anda mengawal naratif secara matang. Pembuli kehilangan kuasa untuk memanipulasi emosi anda, manakala pihak berkuasa sekolah dapat mengambil tindakan undang-undang siber secara rasmi.',
        boldTakeaway: 'Mengekalkan ketenangan emosi sambil bertindak melalui saluran undang-undang rasmi adalah perisai paling ampuh terhadap buli siber.',
        psychologicalImpact: 'Memulihkan kestabilan mental dan mengukuhkan sokongan sosial keluarga.'
      }
    ]
  },
  {
    id: 3,
    title: 'Tradisi Haram & "Ragging" di Asrama',
    category: 'Buli Fizikal',
    dangerLevel: 'Kritikal',
    themeColor: 'amber',
    imageSrc: SCENE_HOSTEL,
    situation: 'Tepat jam 1:00 pagi, beberapa pelajar senior mengetuk pintu bilik anda di asrama dan mengarahkan semua junior turun ke bilik basuh untuk "sesi suai kenal keras". Mereka mengugut akan mengenakan denda fizikal dan menumbuk sesiapa yang ingkar kerana mendakwa ini tradisi wajib tahunan.',
    innerMonologue: '"Ini bukan tradisi, ini ancaman bahaya fizikal!"',
    choices: [
      {
        id: '3a',
        text: 'Ajak beberapa rakan junior lain bawa kayu dan alatan tajam untuk bergaduh secara fizikal dengan senior bagi menunjukkan siapa lebih kuat.',
        isCorrect: false,
        consequence: 'Keganasan fizikal boleh mengakibatkan kecederaan parah, kematian yang tidak diingini, serta tindakan buang sekolah serta-merta dan hukuman penjara juvana.',
        boldTakeaway: 'Melawan buli fizikal dengan keganasan maut hanya mengundang tragedi jenayah dan masa depan yang musnah.',
        psychologicalImpact: 'Trauma fizikal dan keganasan yang merosakkan psikologi seumur hidup.'
      },
      {
        id: '3b',
        text: 'Pasrah dan akur turun ke bilik basuh, menerima tamparan dan denda kerana menganggap ini harga yang perlu dibayar demi kelangsungan hidup di asrama.',
        isCorrect: false,
        consequence: 'Ketundukan ini menyuburkan kitaran penderaan. Pembuli akan menganggap anda sasaran empuk dan penderaan akan menjadi semakin dahsyat pada masa hadapan.',
        boldTakeaway: 'Menyerah kalah kepada kekerasan fizikal membenarkan penjenayah terus berkuasa dan merosakkan maruah diri.',
        psychologicalImpact: 'Sindrom ketidakberdayaan yang dipelajari (learned helplessness) dan kecederaan trauma.'
      },
      {
        id: '3c',
        text: 'Kunci pintu bilik dengan segera bersama rakan sebilik, hubungi nombor kecemasan Warden Bertugas/Penyelia Asrama melalui telefon, dan buat laporan rasmi tanpa kompromi.',
        isCorrect: true,
        consequence: 'Langkah pantas ini berjaya menyelamatkan anda dan rakan-rakan daripada kecederaan fizikal. Pihak pentadbiran asrama dapat menghentikan kegiatan haram ini sebelum berlaku malapetaka.',
        boldTakeaway: 'Keselamatan nyawa tiada kompromi; lapor segera kepada pihak berautoriti untuk membanteras budaya buli asrama.',
        psychologicalImpact: 'Menegakkan rasa selamat dan membina persekitaran asrama yang bebas keganasan.'
      }
    ]
  },
  {
    id: 4,
    title: 'Pemulauan Kumpulan: "Silent Treatment"',
    category: 'Buli Emosi',
    dangerLevel: 'Sederhana',
    themeColor: 'blue',
    imageSrc: SCENE_CANTEEN,
    situation: 'Sejak minggu lepas, kumpulan rakan rapat yang biasa bersama anda di kantin tiba-tiba menjauhkan diri. Apabila anda duduk semeja, mereka senyap, saling berpandangan sinis, dan mula bangun berpindah ke meja lain tanpa memberitahu apa-apa sebab.',
    innerMonologue: '"Nilai diri aku tak ditentukan oleh layanan dingin mereka."',
    choices: [
      {
        id: '4a',
        text: 'Merayu-rayu meminta maaf setiap jam di WhatsApp walaupun tidak tahu apa kesalahan, sanggup belanja mereka makanan dan belikan hadiah demi diterima semula.',
        isCorrect: false,
        consequence: 'Perilaku "people-pleasing" ini menjadikan anda mangsa manipulasi emosi (emotional hostage). Rakan toksik akan mempergunakan rasa rendah diri anda untuk kepentingan mereka.',
        boldTakeaway: 'Mengemis kasih sayang daripada mereka yang sengaja meminggirkan anda akan memusnahkan maruah dan harga diri.',
        psychologicalImpact: 'Ketergantungan emosi tidak sihat dan kerapuhan nilai kendiri.'
      },
      {
        id: '4b',
        text: 'Balas dendam dengan membuka rahsia peribadi mereka kepada kumpulan pelajar lain untuk memastikan nama mereka busuk di sekolah.',
        isCorrect: false,
        consequence: 'Menabur fitnah dan membuka aib hanya mencetuskan peperangan puak di sekolah, menjadikan anda kelihatan tidak matang dan tidak boleh dipercayai oleh orang lain.',
        boldTakeaway: 'Membalas pemulauan dengan pembongkaran aib membuktikan anda sama toksik dengan mereka.',
        psychologicalImpact: 'Keracunan emosi dan kehilangan sokongan daripada rakan-rakan yang neutral.'
      },
      {
        id: '4c',
        text: 'Minta ruang untuk berbincang secara matang sekali sahaja: "Jika ada perselisihan faham, mari bincang baik-baik". Sekiranya mereka berterusan toksik, tetapkan sempadan diri (healthy boundaries) dan mulakan pergaulan baharu dengan rakan yang positif.',
        isCorrect: true,
        consequence: 'Anda menangani isu dengan kepala dingin dan bermaruah. Anda belajar bahawa nilai diri anda tidak ditentukan oleh penerimaan orang toksik, membuka pintu kepada persahabatan yang jauh lebih ikhlas.',
        boldTakeaway: 'Menghargai maruah diri bermaksud berani melepaskan hubungan toksik demi kesihatan mental yang sejahtera.',
        psychologicalImpact: 'Membina kematangan emosi, keyakinan kendiri, dan keupayaan memilih persekitaran sosial sihat.'
      }
    ]
  },
  {
    id: 5,
    title: 'Burnout Menjelang Peperiksaan Besar',
    category: 'Tekanan Akademik',
    dangerLevel: 'Tinggi',
    themeColor: 'amber',
    imageSrc: SCENE_BURNOUT,
    situation: 'Tinggal 3 minggu sebelum peperiksaan penting. Ibu bapa menaruh harapan tinggi agar anda memperoleh Straight A+. Anda hanya tidur 2 jam sehari, bergantung kepada minuman tenaga dan kopi pekat. Malam ini, dada anda mula berdebar laju, kepala berdenyut hebat dan anda mula mengalami serangan panik (panic attack).',
    innerMonologue: '"Dada aku sesak, badan aku menjerit minta rehat sekarang."',
    choices: [
      {
        id: '5a',
        text: 'Teguk lagi satu tin minuman bertenaga tinggi, paksa diri menampar muka untuk kekal celik dan berikrar tidak akan tidur sehingga subuh demi menghabiskan sukatan.',
        isCorrect: false,
        consequence: 'Tekanan berlebihan bersama dos kafein tinggi boleh menyebabkan kegagalan jantung mengejut, sawan kepenatan, dan kerosakan kekal pada memori kognitif otak.',
        boldTakeaway: 'Memaksa tubuh yang sedang rebah bukan tanda ketabahan, tetapi jalan pintas menuju keruntuhan fizikal dan mental.',
        psychologicalImpact: 'Burnout kritikal, penurunan keupayaan mengingat sehingga 60%, dan trauma peperiksaan.'
      },
      {
        id: '5b',
        text: 'Putus asa sepenuhnya, baling semua buku ke lantai, mengurung diri dan menghabiskan sisa malam menonton video lucut beban tanpa peduli masa depan.',
        isCorrect: false,
        consequence: 'Tindakan menyerah kalah secara impulsif meninggalkan rasa bersalah yang lebih mendalam keesokan harinya dan memusnahkan persediaan yang telah anda bina berbulan-bulan.',
        boldTakeaway: 'Melarikan diri ke lembah putus asa membunuh potensi sebenar yang masih boleh diselamatkan dengan strategi betul.',
        psychologicalImpact: 'Rasa kegagalan yang melumpuhkan motivasi diri.'
      },
      {
        id: '5c',
        text: 'Hentikan belajar serta-merta, lakukan teknik pernafasan 4-7-8 untuk stabilkan degupan jantung, minum air kosong, tidur secukupnya (6-7 jam), dan susun semula jadual belajar realistik dengan kaedah Pomodoro keesokan harinya.',
        isCorrect: true,
        consequence: 'Otak anda mendapat peluang untuk mengukuhkan memori ketika fasa tidur REM, degupan jantung kembali stabil, dan anda dapat berfikir dengan jernih serta berprestasi tinggi dalam peperiksaan.',
        boldTakeaway: 'Kesejahteraan tidur dan kesihatan mental adalah kunci utama kepada kejayaan akademik sebenar, bukan bilangan jam berjaga.',
        psychologicalImpact: 'Peningkatan konsentrasi kognitif, ketenangan emosi, dan ketahanan menghadapi tekanan.'
      }
    ]
  },
  {
    id: 6,
    title: 'Manipulasi & "Gaslighting" Rakan Projek',
    category: 'Buli Emosi',
    dangerLevel: 'Sederhana',
    themeColor: 'cyan',
    imageSrc: SCENE_CYBER,
    situation: 'Dalam tugasan kumpulan penting sekolah, seorang ahli yang merupakan rakan popular tidak menyiapkan bahagiannya langsung. Semasa pembentangan di hadapan guru, dia menyalahkan anda di hadapan kelas: "Sebenarnya saya dah hantar bahagian saya pada dia, tapi dia yang terlupa selitkan dalam slaid. Awak sengaja nak sabotaj saya kan?"',
    innerMonologue: '"Fakta dan bukti kerja digital takkan mampu menipu sesiapa."',
    choices: [
      {
        id: '6a',
        text: 'Mengaku salah secara senyap dan tunduk meminta maaf di hadapan guru semata-mata kerana mahu menjaga persahabatan dan mengelakkan drama kelas.',
        isCorrect: false,
        consequence: 'Anda membiarkan diri dijadikan kambing hitam. Rakan tersebut akan terus memanipulasi orang lain dan reputasi akademik anda dicemari sebagai pelajar tidak bertanggungjawab.',
        boldTakeaway: 'Mengorbankan kebenaran demi menjaga hati seorang pembohong adalah bentuk pengkhianatan kepada diri sendiri.',
        psychologicalImpact: 'Menghakis rasa hormat pada prinsip diri dan mengukuhkan peranan mangsa manipulasi.'
      },
      {
        id: '6b',
        text: 'Mengamuk serta-merta, menengking rakan tersebut dengan kata-kata kesat dan menolak meja kelas sehingga sesi pembelajaran terganggu.',
        isCorrect: false,
        consequence: 'Kemarahan melampau anda mengalihkan fokus isu daripada kecuaian rakan tersebut kepada kesalahan disiplin anda sendiri, menyebabkan anda dikenakan tindakan tatatertib.',
        boldTakeaway: 'Kemarahan tanpa kawalan hanya memusnahkan hujah yang benar dan menjerumuskan anda ke dalam masalah disiplin.',
        psychologicalImpact: 'Kekesalan akibat tindakan luar kawalan dan stigma pelajar panas baran.'
      },
      {
        id: '6c',
        text: 'Kekal tenang, bersuara dengan nada profesional: "Cikgu, izinkan saya buka Google Docs version history dan log perbualan rasmi tugasan untuk kita semak status penghantaran secara telus."',
        isCorrect: true,
        consequence: 'Fakta dan bukti digital membuktikan kebenaran tanpa perlu bergaduh emosi. Guru menghargai ketelitian anda dan rakan manipulatif tersebut terpaksa bertanggungjawab atas tindakannya.',
        boldTakeaway: 'Bertenang dan menjawab dengan bukti kukuh mematikan sebarang manipulasi serta melindungi integriti anda.',
        psychologicalImpact: 'Memperkasa asertiviti diri dan membina kemahiran kepimpinan krisis.'
      }
    ]
  },
  {
    id: 7,
    title: 'Ujian "FOMO" & Tekanan Pod Vape / Bahan Terlarang',
    category: 'Tekanan Rakan Sebaya',
    dangerLevel: 'Tinggi',
    themeColor: 'rose',
    imageSrc: SCENE_HOSTEL,
    situation: 'Di belakang bangunan makmal selepas waktu sekolah, sekumpulan pelajar senior dan rakan sekelas yang kelihatan "cool" sedang melepak. Mereka menghulurkan pod vape berperisa buah dengan campuran cecair yang tidak diketahui kepada anda sambil mengejek: "Kau budak baik sangat ke? Hisap sikit baru nampak matang! Takkan hisap pod pun nak takut macam budak tadika?"',
    innerMonologue: '"Kesihatan paru-paru aku terlalu mahal untuk digadaikan."',
    choices: [
      {
        id: '7a',
        text: 'Tarik pod tersebut dan sedut sedikit untuk sekadar "menjaga muka" dan membuktikan kepada mereka bahawa anda bukan pengecut.',
        isCorrect: false,
        consequence: 'Langkah pertama ini membuka pintu kepada ketagihan nikotin sintetik, kerosakan paru-paru (EVALI), dan risiko terjebak ke bahan terlarang yang lebih kronik.',
        boldTakeaway: 'Menggadaikan kesihatan diri hanya demi pengiktirafan murahan rakan sebaya adalah kerugian seumur hidup.',
        psychologicalImpact: 'Penyesalan mendalam dan kerentanan kepada ketagihan kimia otak.'
      },
      {
        id: '7b',
        text: 'Ketawa sinis dan menghina mereka dengan perkataan penghinaan seperti "Dasar sampah masyarakat!", mencetuskan perbalahan mulut yang panas.',
        isCorrect: false,
        consequence: 'Provokasi lisan yang agresif di kawasan terpencil mengundang bahaya serangan fizikal berkumpulan tanpa sempat anda meminta pertolongan.',
        boldTakeaway: 'Menghina orang lain secara melulu ketika berada dalam situasi berisiko tinggi membahayakan keselamatan nyawa anda.',
        psychologicalImpact: 'Kecelaruan emosi dan peningkatan ancaman keselamatan fizikal.'
      },
      {
        id: '7c',
        text: 'Buat kontak mata dengan tenang, senyum dan nyatakan penolakan tegas: "Terima kasih, tapi aku memang tak berminat. Ada urusan hal perpustakaan sekarang", kemudian terus beredar dengan yakin dari lokasi berisiko.',
        isCorrect: true,
        consequence: 'Anda mempamerkan kekuatan jati diri yang mengagumkan. Sikap tegas tanpa menghakimi menutup ruang ejekan dan melindungi kesihatan badan anda seumur hidup.',
        boldTakeaway: 'Keberanian sebenar adalah berani berkata "TIDAK" kepada perkara yang merosakkan diri walaupun bersendirian.',
        psychologicalImpact: 'Memperkukuh autonomi diri dan imuniti psikologi terhadap tekanan luar.'
      }
    ]
  },
  {
    id: 8,
    title: 'Rakan Menunjukkan Tanda Ingin Mencederakan Diri',
    category: 'Kesihatan Mental',
    dangerLevel: 'Kritikal',
    themeColor: 'rose',
    imageSrc: SCENE_BURNOUT,
    situation: 'Jam 1:15 pagi, kawan baik anda menghantar mesej teks ringkas di Telegram: "Terima kasih untuk segalanya selama ni. Aku rasa dunia ni akan lebih tenang kalau aku tak wujud langsung esok... Maafkan salah silap aku ya." Selepas mesej itu, telefonnya dimatikan.',
    innerMonologue: '"Ini kecemasan nyawa sebenar, aku kena selamatkan kawan aku!"',
    choices: [
      {
        id: '8a',
        text: 'Anggap mesej itu sekadar drama lewat malam atau "caption emo" untuk menarik perhatian, lalu tidur semula dan berhasrat bertanya esok di sekolah.',
        isCorrect: false,
        consequence: 'Kelewatan bertindak dalam krisis membahayakan nyawa boleh berhujung dengan tragedi kematian yang tidak dapat diundur. Setiap isyarat mencederakan diri mesti diambil serius 100%.',
        boldTakeaway: 'Mengabaikan jeritan meminta tolong rakan boleh mengakibatkan penyesalan seumur hidup yang tidak mampu ditebus.',
        psychologicalImpact: 'Rasa bersalah survivor (survivor guilt) yang boleh menghancurkan psikologi.'
      },
      {
        id: '8b',
        text: 'Kongsikan tangkap layar mesej tersebut di Story Instagram/WhatsApp status anda untuk bertanyakan siapa tahu di mana dia berada sekarang.',
        isCorrect: false,
        consequence: 'Mendedahkan krisis peribadi rakan di khalayak umum mencetuskan spekulasi liar, memalukan keluarganya, dan boleh mempercepatkan tindakannya mencederakan diri akibat panik.',
        boldTakeaway: 'Menularkan krisis kecemasan mental di media sosial melanggar privasi mangsa dan memburukkan keadaan.',
        psychologicalImpact: 'Kekecohan umum dan memecahkan amanah persahabatan.'
      },
      {
        id: '8c',
        text: 'Segera hubungi ibu bapa atau adik-beradiknya tanpa berlengah, maklumkan Warden/Guru Kaunseling, dan jika kritikal hubungi talian kecemasan 999 atau Talian HEAL 15555 untuk intervensi segera.',
        isCorrect: true,
        consequence: 'Tindakan pantas dan tepat ini berjaya menyelamatkan satu nyawa manusia berharga. Rakan anda menerima bantuan kecemasan profesional sebelum sesuatu yang buruk berlaku.',
        boldTakeaway: 'Menghubungi bantuan kecemasan dan keluarga dengan serta-merta adalah perbezaan antara hidup dan mati seorang rakan.',
        psychologicalImpact: 'Penyelamat nyawa sejati dan pemangkin sistem sokongan krisis yang selamat.'
      }
    ]
  },
  {
    id: 9,
    title: 'Penghinaan Fizikal (Body Shaming) di Kantin',
    category: 'Buli Emosi',
    dangerLevel: 'Sederhana',
    themeColor: 'amber',
    imageSrc: SCENE_CANTEEN,
    situation: 'Semasa sedang beratur membeli makanan di kantin sekolah yang sesak, seorang pelajar yang dikenali gemar mengejek orang lain berseloroh dengan suara lantang mengutuk saiz tubuh anda: "Wah, tengok tu! Muat ke kerusi kantin nanti kalau asyik makan je? Patutlah cermin tandas pun retak!" Sekumpulan pelajar di sekeliling ketawa terbahak-bahak.',
    innerMonologue: '"Bentuk fizikal aku bukan bahan jenaka murahan sesiapa."',
    choices: [
      {
        id: '9a',
        text: 'Tunduk memandang lantai, letak pinggan makanan tanpa makan, dan berikrar tidak akan makan nasi selama sebulan untuk kurus secara drastik.',
        isCorrect: false,
        consequence: 'Tindakan diet ekstrem membahayakan sistem metabolik badan dan mencetuskan gangguan pemakanan (eating disorder seperti anorexia/bulimia) yang memudaratkan kesihatan fizikal.',
        boldTakeaway: 'Menghukum tubuh sendiri akibat kata-kata keji pembuli memusnahkan kesihatan jasmani dan emosi anda.',
        psychologicalImpact: 'Ketaksuban negatif terhadap imej tubuh (body dysmorphia) dan kemurungan.'
      },
      {
        id: '9b',
        text: 'Menolak mangkuk sup panas ke arah pembuli tersebut dengan kemarahan meluap-luap untuk memberi pengajaran di khalayak ramai.',
        isCorrect: false,
        consequence: 'Tindakan mencederakan orang lain secara fizikal menjadikan anda pesalah jenayah dan boleh menyebabkan penggantungan persekolahan serta tindakan polis.',
        boldTakeaway: 'Tindak balas fizikal berbahaya mengubah status anda daripada mangsa kepada pelaku jenayah.',
        psychologicalImpact: 'Rekod disiplin tercalar dan trauma pergaduhan awam.'
      },
      {
        id: '9c',
        text: 'Tegakkan bahu, pandang tepat matanya dengan tenang dan berkata tegas: "Bentuk badan orang lain bukan bahan jenaka untuk cari perhatian murah", kemudian selesaikan urusan makan anda tanpa menunjukkan reaksi tertekan, serta laporkan insiden kepada guru bertugas.',
        isCorrect: true,
        consequence: 'Ketenangan dan kata-kata bernas anda membuatkan pembuli terdiam malu kerana jenaka toksiknya gagal menjatuhkan semangat anda. Anda menunjukkan kelas moral yang jauh lebih tinggi.',
        boldTakeaway: 'Menolak untuk menjadi mangsa dengan jawapan tegas dan beradab melucutkan senjata utama si pembuli.',
        psychologicalImpact: 'Memperkasa ketahanan imej kendiri dan menanamkan rasa hormat rakan sebaya.'
      }
    ]
  },
  {
    id: 10,
    title: 'Meruntuhkan Stigma: Mendapatkan Bantuan Kaunseling',
    category: 'Kesihatan Mental',
    dangerLevel: 'Tinggi',
    themeColor: 'blue',
    imageSrc: SCENE_COUNSELING,
    situation: 'Sudah lebih sebulan anda berasa lesu, sukar tidur, sering cemas tanpa sebab, dan hilang minat terhadap semua hobi yang pernah anda minati. Anda berhasrat melangkah masuk ke Bilik Bimbingan & Kaunseling, namun terdengar bisikan beberapa rakan: "Siapa masuk bilik kaunselor tu sah-sah bermasalah mental atau budak jahat!"',
    innerMonologue: '"Mencari bantuan adalah tanda keberanian, bukan kelemahan!"',
    choices: [
      {
        id: '10a',
        text: 'Batalkan hasrat ke bilik kaunselor dan pendam perasaan seorang diri, berharap masalah ini akan hilang dengan sendirinya suatu hari nanti.',
        isCorrect: false,
        consequence: 'Kesihatan mental yang tidak dirawat tidak akan hilang secara ajaib; ia akan bertukar menjadi gangguan kebimbangan melampau (Generalized Anxiety) atau kemurungan klinikal yang menjejaskan masa depan anda.',
        boldTakeaway: 'Membiarkan stigma menghalang rawatan kesihatan mental sama seperti membiarkan luka fizikal bernanah tanpa ubat.',
        psychologicalImpact: 'Kemerosotan kualiti hidup, kemerosotan akademik, dan rasa terpencil.'
      },
      {
        id: '10b',
        text: 'Membeli pil penenang atau suplemen tidur yang dijual tanpa preskripsi doktor oleh penjual tidak bertauliah di aplikasi media sosial.',
        isCorrect: false,
        consequence: 'Mengambil bahan kimia tidak terkawal boleh merosakkan organ hati dan buah pinggang, serta mencetuskan ketagihan ubat-ubatan berbahaya.',
        boldTakeaway: 'Mencari jalan pintas dengan bahan terlarang tidak berdaftar adalah perangkap bahaya yang merosakkan tubuh.',
        psychologicalImpact: 'Ketagihan kimia dan komplikasi perubatan yang serius.'
      },
      {
        id: '10c',
        text: 'Melangkah masuk ke Bilik Kaunseling dengan bangga dan berkeyakinan; sedar bahawa meminta bantuan adalah tanda keberanian dan kebijaksanaan untuk menjaga diri, bukan kelemahan.',
        isCorrect: true,
        consequence: 'Anda memenangi pertempuran menentang stigma masyarakat. Sesi bimbingan kaunselor memberi anda strategi koping berasaskan sains, sokongan emosi selamat, dan memulihkan potensi hidup anda sepenuhnya.',
        boldTakeaway: 'Berani mendapatkan bantuan profesional adalah bukti kekuatan jiwa yang paling hebat seorang watak utama!',
        psychologicalImpact: 'Pemulihan emosi holistik, kesedaran kendiri yang tinggi, dan daya tahan hidup sepanjang hayat.'
      }
    ]
  }
];
