const springAsset = (name) => `/images/spring-collection-2026/${name}`
const summerAsset = (name) => `/images/summer-collection-2026/${name}`

export const COLLECTIONS = {
  spring: {
    title: 'SPRING COLLECTION',
    year: '2026',
    heroImage: springAsset('imgi_3_img_main_01.png'),
    intro: '따뜻한 봄날의 외출을 더 즐겁게 만들어주는 핫 비스킷 키즈 스타일.',
    looks: [
      {
        id: 'spring-look-01',
        number: '01',
        title: 'SPRING SHIRTS',
        model: '모델 착용 사이즈 80cm',
        menuImage: springAsset('imgi_16_menu_01.png'),
        images: [
          springAsset('imgi_25_look01_img_01.png'),
          springAsset('imgi_26_look01_img_02.png'),
          springAsset('imgi_27_look01_img_03.png'),
        ],
        products: [
          {
            id: 'spring-01',
            name: '남아 봄옷',
            price: 29000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_rLN50yrILOe17lfXixuYAuFPQTw5R1xj9Brdw3t8u5s/redirect',
            keywords: ['남아', '봄옷', '봄', 'spring', 'shirts', 'shirt', 'shortall', 'overalls'],
          },
        ],
      },
      {
        id: 'spring-look-02',
        number: '02',
        title: 'SPRING DRESS',
        model: '모델 착용 사이즈 80cm',
        menuImage: springAsset('imgi_17_menu_02.png'),
        images: [
          springAsset('imgi_34_look02_img_01.png'),
          springAsset('imgi_35_look02_img_01b.png'),
          springAsset('imgi_36_look02_img_01c.png'),
        ],
        products: [
          {
            id: 'spring-02',
            name: '여아 봄옷',
            price: 32000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_UGzTbcDDm65mAILlYfBGolS87wuCiymcE82P41xlxzy/redirect',
            keywords: ['여아', '봄옷', '봄', 'spring', 'dress', 'shirts'],
          },
        ],
      },
      {
        id: 'spring-look-03',
        number: '03',
        title: 'SPRING SHOES',
        model: '봄 컬렉션 코디 아이템',
        menuImage: springAsset('imgi_18_menu_03.png'),
        images: [
          springAsset('imgi_45_look03_img_01.png'),
          springAsset('imgi_46_look03_img_02.png'),
          springAsset('imgi_47_look03_img_03.png'),
        ],
        products: [
          {
            id: 'spring-03',
            name: '신발',
            price: 39000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_VZUKOBk1UskUI4L8QK58tAnZ6VqOP4Ex1bwm11cVtzk/redirect',
            keywords: ['신발', '봄', 'spring', 'shoes'],
          },
        ],
      },
      {
        id: 'spring-look-04',
        number: '04',
        title: 'T-SHIRTS',
        model: '모델 착용 사이즈 80cm',
        menuImage: springAsset('imgi_19_menu_04.png'),
        images: [
          springAsset('imgi_55_look04_img_01.png'),
          springAsset('imgi_56_look04_img_02.png'),
          springAsset('imgi_57_look04_img_03.png'),
        ],
        products: [
          {
            id: 'spring-04',
            name: 'T-SHIRTS',
            price: 33000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_DMmJAal9JiR6c6fqXWsWvtcFt7iv23UyB3Y332ifVX1/redirect',
            keywords: ['봄', 'spring', 't-shirts', 'tshirt', '티셔츠'],
          },
        ],
      },
      {
        id: 'spring-look-05',
        number: '05',
        title: 'DRESS',
        model: '모델 착용 사이즈 80cm',
        menuImage: springAsset('imgi_20_menu_05.png'),
        images: [
          springAsset('imgi_70_look05_img_01.png'),
          springAsset('imgi_71_look05_img_02.png'),
          springAsset('imgi_73_look05_img_03.png'),
        ],
        products: [
          {
            id: 'spring-05',
            name: 'DRESS',
            price: 36000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_RlUiik45BWRFm1DgRlejP3fGJSopwXRmjyXAa1DO2B0/redirect',
            keywords: ['봄', 'spring', 'dress', '원피스'],
          },
        ],
      },
      {
        id: 'spring-look-06',
        number: '06',
        title: 'SHORTALL',
        model: '모델 착용 사이즈 70cm',
        menuImage: springAsset('imgi_21_menu_06.png'),
        images: [
          springAsset('imgi_77_look06_img_01.png'),
          springAsset('imgi_78_look06_img_02.png'),
          springAsset('imgi_77_look06_img_01.png'),
        ],
        products: [
          {
            id: 'spring-06',
            name: 'SHORTALL',
            price: 34000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_I0vK0fKNzvpnVhYXmHbpXHsKjHfoeuOfsztXY0iYiqv/redirect',
            keywords: ['봄', 'spring', 'shortall', '쇼트올'],
          },
        ],
      },
      {
        id: 'spring-look-07',
        number: '07',
        title: 'SPRING STYLE',
        model: '모델 착용 사이즈 80cm',
        menuImage: springAsset('imgi_22_menu_07.png'),
        images: [
          springAsset('imgi_87_look07_img_01.png'),
          springAsset('imgi_88_look07_img_02.png'),
          springAsset('imgi_89_look07_img_03.png'),
        ],
        products: [
          {
            id: 'spring-07',
            name: 'SPRING STYLE',
            price: 31000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_5GxlI26fkAICEmXk2EXyjNZU9ibNIianQYMQg3PAeog/redirect',
            keywords: ['봄', 'spring', 'style', '코디'],
          },
        ],
      },
      {
        id: 'spring-look-08',
        number: '08',
        title: 'SPRING OVERALLS',
        model: '모델 착용 사이즈 80cm',
        menuImage: springAsset('imgi_23_menu_08.png'),
        images: [
          springAsset('imgi_95_look08_img_01.png'),
          springAsset('imgi_96_look08_img_02.png'),
          springAsset('imgi_97_look08_img_03.png'),
        ],
        products: [
          {
            id: 'spring-08',
            name: 'SPRING OVERALLS',
            price: 37000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_kLB2mjdRMHvi4Ex0Pg64lgF2ef64P1R5ILmjy3fI5wi/redirect',
            keywords: ['봄', 'spring', 'overalls', '오버롤'],
          },
        ],
      },
    ],
  },
  summer: {
    title: 'SUMMER COLLECTION',
    year: '2026',
    heroImage: summerAsset('imgi_5_img_main_01.png'),
    intro: '더운 여름도 마음에 드는 옷과 함께라면 즐거운 외출이 되는 핫 비스킷 키즈 스타일.',
    looks: [
      {
        id: 'summer-look-01',
        number: '01',
        title: 'SAILOR SHIRTS',
        model: '모델 착용 사이즈 80cm',
        menuImage: summerAsset('imgi_16_menu_01.png'),
        images: [
          summerAsset('imgi_28_look01_img_01.png'),
          summerAsset('imgi_29_look01_img_02.png'),
          summerAsset('imgi_30_look01_img_03.png'),
        ],
        products: [
          {
            id: 'summer-01',
            name: '남아 여름옷',
            price: 27000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_cwsB6WXndLh8qgI6KGbIKzDrZgsMzvaElb8Zc18fwqN/redirect',
            keywords: ['남아', '여름옷', '여름', 'summer', 't-shirts', 'tshirt', 'jinbei'],
          },
        ],
      },
      {
        id: 'summer-look-02',
        number: '02',
        title: 'SAILOR DRESS',
        model: '모델 착용 사이즈 80cm',
        menuImage: summerAsset('imgi_17_menu_02.png'),
        images: [
          summerAsset('imgi_35_look02_img_01.png'),
          summerAsset('imgi_36_look02_img_02.png'),
          summerAsset('imgi_37_look02_img_03.png'),
        ],
        products: [
          {
            id: 'summer-02',
            name: '여아 여름옷',
            price: 25000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_qhk3bMA8XT9mASHPLoTNhlA6OkMwSPW1xAasW2gVY0U/redirect',
            keywords: ['여아', '여름옷', '여름', 'summer', 'dress', 't-shirts'],
          },
        ],
      },
      {
        id: 'summer-look-03',
        number: '03',
        title: 'SAILOR SHORTALL',
        model: '모델 착용 사이즈 70cm',
        menuImage: summerAsset('imgi_18_menu_03.png'),
        images: [
          summerAsset('imgi_44_look03_img_01.png'),
          summerAsset('imgi_45_look03_img_02.png'),
          summerAsset('imgi_46_look03_img_03.png'),
        ],
        products: [
          {
            id: 'summer-03',
            name: '신발',
            price: 35000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_Phtsix5soFYSrPg5VZmskXT4nTyMqiY11xrJp3fI7pt/redirect',
            keywords: ['신발', '여름', 'summer', 'shoes'],
          },
        ],
      },
      {
        id: 'summer-look-04',
        number: '04',
        title: 'T-SHIRTS',
        model: '모델 착용 사이즈 80cm',
        menuImage: summerAsset('imgi_19_menu_04.png'),
        images: [
          summerAsset('imgi_55_look04_img_01.png'),
          summerAsset('imgi_56_look04_img_02.png'),
          summerAsset('imgi_57_look04_img_03.png'),
        ],
        products: [
          {
            id: 'summer-04',
            name: 'T-SHIRTS',
            price: 33000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_lLJYnDKV1Z61Ju9YeTJ0iqXHcXVN5z26tS9Kt3BsHjv/redirect',
            keywords: ['여름', 'summer', 't-shirts', 'tshirt', '티셔츠'],
          },
        ],
      },
      {
        id: 'summer-look-05',
        number: '05',
        title: 'DRESS',
        model: '모델 착용 사이즈 80cm',
        menuImage: summerAsset('imgi_20_menu_05.png'),
        images: [
          summerAsset('imgi_64_look05_img_01.png'),
          summerAsset('imgi_65_look05_img_02.png'),
          summerAsset('imgi_66_look05_img_03.png'),
        ],
        products: [
          {
            id: 'summer-05',
            name: 'DRESS',
            price: 36000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_gISMAuB3GNVzr6DQ6devDIlYgQCLx0zcYyB7943Hdt7/redirect',
            keywords: ['여름', 'summer', 'dress', '원피스'],
          },
        ],
      },
      {
        id: 'summer-look-06',
        number: '06',
        title: 'SHORTALL',
        model: '모델 착용 사이즈 70cm',
        menuImage: summerAsset('imgi_21_menu_06.png'),
        images: [
          summerAsset('imgi_72_look06_img_01.png'),
          summerAsset('imgi_73_look06_img_02.png'),
          summerAsset('imgi_74_look06_img_03.png'),
        ],
        products: [
          {
            id: 'summer-06',
            name: 'SHORTALL',
            price: 34000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_t66ButhpbWxp4lraoDt4tmutDGB5i2sDWNZUb1E8Y3W/redirect',
            keywords: ['여름', 'summer', 'shortall', '쇼트올'],
          },
        ],
      },
      {
        id: 'summer-look-07',
        number: '07',
        title: 'T-SHIRTS',
        model: '모델 착용 사이즈 80cm',
        menuImage: summerAsset('imgi_22_menu_07.png'),
        images: [
          summerAsset('imgi_82_look07_img_01.png'),
          summerAsset('imgi_84_look07_img_02.png'),
          summerAsset('imgi_86_look07_img_03.png'),
        ],
        products: [
          {
            id: 'summer-07',
            name: 'T-SHIRTS',
            price: 31000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_UOfqBTnoHR1oMa6n03ygUuQvnl9oXdDBEH8xc0L3Ola/redirect',
            keywords: ['여름', 'summer', 't-shirts', 'tshirt', '티셔츠'],
          },
        ],
      },
      {
        id: 'summer-look-08',
        number: '08',
        title: 'T-SHIRTS',
        model: '모델 착용 사이즈 80cm',
        menuImage: summerAsset('imgi_23_menu_08.png'),
        images: [
          summerAsset('imgi_89_look08_img_01.png'),
          summerAsset('imgi_90_look08_img_02.png'),
          summerAsset('imgi_91_look08_img_03.png'),
        ],
        products: [
          {
            id: 'summer-08',
            name: 'T-SHIRTS',
            price: 31000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_Dzb1ybOyjsThoMmwFDedSoh1afRawz6S6lhzs1wujv7/redirect',
            keywords: ['여름', 'summer', 't-shirts', 'tshirt', '티셔츠'],
          },
        ],
      },
      {
        id: 'summer-look-09',
        number: '09',
        title: 'JINBEI',
        model: '모델 착용 사이즈 80cm',
        menuImage: summerAsset('imgi_24_menu_09.png'),
        images: [
          summerAsset('imgi_101_look09_img_01.png'),
          summerAsset('imgi_102_look09_img_02.png'),
          summerAsset('imgi_104_look09_img_03.png'),
        ],
        products: [
          {
            id: 'summer-09',
            name: 'JINBEI',
            price: 38000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_cxNGnlhnkCf1c0noxmrv4to8xmpiVBuecx1KK020nXZ/redirect',
            keywords: ['여름', 'summer', 'jinbei', '진베이'],
          },
        ],
      },
      {
        id: 'summer-look-10',
        number: '10',
        title: 'JINBEI',
        model: '모델 착용 사이즈 80cm',
        menuImage: summerAsset('imgi_25_menu_10.png'),
        images: [
          summerAsset('imgi_109_look10_img_01.png'),
          summerAsset('imgi_110_look10_img_02.png'),
          summerAsset('imgi_111_look10_img_03.png'),
        ],
        products: [
          {
            id: 'summer-10',
            name: 'JINBEI',
            price: 38000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_mPOapeMwn1S7Yw8JTbMYqsXEHri80DsbLE9SO175zlw/redirect',
            keywords: ['여름', 'summer', 'jinbei', '진베이'],
          },
        ],
      },
      {
        id: 'summer-look-11',
        number: '11',
        title: 'JINBEI OVERALLS',
        model: '여름 컬렉션 코디 아이템',
        menuImage: summerAsset('imgi_26_menu_11.png'),
        images: [
          summerAsset('imgi_119_look11_img_01.png'),
          summerAsset('imgi_120_look11_img_02.png'),
          summerAsset('imgi_121_look11_img_03.png'),
        ],
        products: [
          {
            id: 'summer-11',
            name: 'JINBEI OVERALLS',
            price: 37000,
            checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_zZwgKAt5tnnMzu9pbgyjlxduHFvH8VTgWdwMy0psGnO/redirect',
            keywords: ['여름', 'summer', 'jinbei', 'overalls', '오버롤'],
          },
        ],
      },
    ],
  },
}

export const getCollectionProducts = () => (
  Object.entries(COLLECTIONS).flatMap(([season, collection]) => (
    collection.looks.flatMap((look) => (
      look.products.map((product) => ({
        ...product,
        season,
        seasonLabel: collection.title.replace(' COLLECTION', ''),
        lookTitle: look.title,
      }))
    ))
  ))
)
