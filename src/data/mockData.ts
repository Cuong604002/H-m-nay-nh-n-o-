import { FoodItem, PlaceItem, Post, Comment } from '../types';

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBwpS4yeO3kxoI2_m2FYdcNFd_iSFw3KcUi0iYcaWSc-j4SBrBxWj_fjcZ4hTxjqtb9YmLBbHKshFaNmctOkf0F_YGQrV1a6uURRTxzKbSezg5LstZ2nuQS1wMUwgkkusjJtnGAf5sRo5OmnMr9mkJbUkGXgvdn9EOIuKBPZoXN7d3v78es-GrBWABsPbycJ-JaSKLel4o69rhYQ9-M7_NUSN9ZWwZfN-LAZFv_99uOmPu4hQNA9egxoLeVTYLHCDNNd_AJieKq8F4";

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'f1',
    name: 'Phở Bò Gia Truyền',
    priceRange: '35.000đ - 55.000đ',
    rating: 4.8,
    reviewsCount: 1240,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZoPwn4UrCeBh-6_XGKlgfHJ4D4Ql2Fgx9sfyRRnwc1kFC3z0KIl5N3lnOpDT8cZHG4scm_IAic8rFm4ct9rcg1RdpsVUbagOAdcl7reD7U6eFuajg-36ZuFq79BWpvDqLhM8y0AeOxWw1CRN0E4GAQOBG4jn5eVv_sApc1_VOKi1hl9L3ifj6DtJhuNvyiqL_b9j0j2MR_akTAGW9mtrB1J8uFYJHmkYmgNmKQPj3AVdHNV3J5wCHmMtnOHf2PcpHzHSAoaBLDdU',
    category: 'Món nước',
    distance: '1.2 km',
    location: 'Hoàn Kiếm, HN',
    description: 'Thịt bò tươi mềm, nước dùng trong veo, ngọt lịm từ xương hầm 12 tiếng.'
  },
  {
    id: 'f2',
    name: 'Bánh Mì Đặc Biệt',
    priceRange: '20.000đ - 40.000đ',
    rating: 4.9,
    reviewsCount: 860,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5BnJU8-B_d4yk9Ov0zIJRvEtv6PIRGpBEAOMI4aIS44fSrt7f_cS1jyjREzxqaTKplqRcaiGFfZTf02r-OAUgM9vLoVKSg2C6ZzcwZrpn9PfyVk6NBJYLQHzP-wyQWLME6ni5qervdn3IzFcHgrJ-QsHXOZt42sIUOit-ZHLtwt8z1EM9JeQ6vqjAB7X5I_zBGgtIPM0quz1Hdm43vO4aooRsmY3e0Z73tZ7ZBYEPnN9RY0ZZ3dU_3IK0A02Q0TxEcOdDwcS9C6o',
    category: 'Món Việt',
    distance: '0.4 km',
    location: 'Hai Bà Trưng, HN',
    description: 'Bánh mì giòn rụm với bơ béo ngậy, pate thơm lừng, thịt nguội và đu đủ muối chua ngọt.'
  },
  {
    id: 'f3',
    name: 'Cơm Tấm Sườn Bì Chả',
    priceRange: '45.000đ - 70.000đ',
    rating: 4.7,
    reviewsCount: 1540,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqeo_UBXJt0PXJJjBQGWMJAud_Q3nu3rRlzbeU6icxaXmONjEonlRXiukOGY4DkW-L-SZPp43LgGF2LSzVCyDv_bWL7e83m4nNrQs1OE2N-yOH6Wp_E3Mx7vcx9OnxiUl-lEc7IoGGLAVYRgzX1wP3RZBWKSSHDrif5icAuuOasLfqNVOH0rCM-lnXUhLZ9qwomC1H_M5cRdjQ3OhrlO3JnCF4yCJr_VfWVQOX3KQ4XFpEcJ_QSsSkSH6kCAR3-ca8y6eLWxS0XJI',
    category: 'Cơm Văn Phòng',
    distance: '1.5 km',
    location: 'Quận 1, TP. HCM',
    description: 'Sườn nướng sả ớt vàng óng mềm mại, ăn kèm chả trứng chưng và nước mắm chua ngọt đặc kẹo.'
  },
  {
    id: 'f4',
    name: 'Bún Chả Cửa Bắc',
    priceRange: '45.000đ - 70.000đ',
    rating: 4.5,
    reviewsCount: 420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkoibr5VpH-A6xpXIANTFGO_ETF8-EBATdc2Gj_z-eYJKBU7h38wvp7QEcAAeMuTb_Qk4ToqcyQ2TJRUcgeBSVdPCGImwoumT-NrrqHBw8zZp9SvtYR_ZQqqcR-7ENEqw-aMccJi6R1XzAvASi_IOt1LDImo2oBTUYTJQ262TVqRLhUb_M_gz2Q9FKCRGhTYhk-RmgrqqX4pN0vF3eTMzyq-M-DrD8xOP8jJMK0cDUCNYCIzPTQ5QbyKUu2PRB5Wf9XAz_FFOnIk8',
    category: 'Món Việt',
    distance: '2.5 km',
    location: 'Ba Đình, HN',
    description: 'Chả miếng nướng xém cạnh, chả viên tươi ngon thả trong bát nước chấm đu đủ tỏi ớt.'
  },
  {
    id: 'f5',
    name: 'Lẩu Thái Seafood',
    priceRange: '150.000đ - 250.000đ',
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAorR-uOFwE2LGoIBULHLdid9V-sXbTD3-sv2Oj7GwUdtvXZiI8gvuyHzTShdyAcrR7H1CE582HPZkosNp5fVl3dGqDBTP7g69pbbO_LFeFy6fAq25vljoGOY6PTaz9DcZ4OGaK4f4Wsnnmn8mKaJdzb5JiGENmc0SktzUW4rUKI9LDImaKsld_0CoZDPyk9jJFJCIJMJFm0vgRZjUC74GE2t8yRbNbEJKIg-Qewa87kKBhFmFzdAROkQfSk3IgePyc8H79x7ITdOg',
    category: 'Lẩu',
    distance: '0.8 km',
    location: 'Đống Đa, HN',
    description: 'Nước lẩu chua cay chuẩn vị Thái thơm nức mùi sả chanh, đầy ắp hải sản tươi, mực, tôm.'
  },
  {
    id: 'f6',
    name: 'BBQ Premium Steak',
    priceRange: '250.000đ - 500.000đ',
    rating: 4.9,
    reviewsCount: 650,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLIRujZY8uRvWLS39kZoTx-omaUYVt-_yIODdsEZHj3BP6qVJrZu0iycVlV1I9OREKOphfMm-q0FgZ3y3ZIYeT-TVWdK2QNyrnPm_wH5gE_0f5Q1YgtzuiLwfK1n15-GVEezXei7CUFLInpBFFAXAjKXYC6XRGO2HBz7DWJ4pOVbj90tG10-ZmERMOLpo_R_1vC1uUPG-q6wQKLZ12A62-Qn0L3VrXHirrdTDbwQfo5QGaW18Mumu65sa2gzrjTx7SWmcnX9n4_6M',
    category: 'Nướng',
    distance: '4.0 km',
    location: 'Tây Hồ, HN',
    description: 'Thịt bò tơ nhập khẩu, nướng vừa độ xém chín mềm, bên trong mọng nước ngọt ngào.'
  },
  {
    id: 'f7',
    name: 'Trà Đào Cam Sả',
    priceRange: '30.000đ - 45.000đ',
    rating: 4.6,
    reviewsCount: 1980,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD97suBMvc-UI3rbcGTe3UTxeK6UKQSupgxX3_SqhWjhfsaNb4yo_g8Be5j2Yo46LwEXb2VmOV53tde_tJTXMeovfb4QApdyKbgEyX9hEcHaeSJeCifecovvNeWXyyAHMvp1EJZ7ooEl_0k02TdpX5OOU0WeCk7JZ63D63xaEIHJyP_0c2xukjF775_n1z8yMNhd79YqtO2oe1ENyTa1LWXiMu3hefQ6tA89wgCrLzy6zlIQEyjBMr6B-mAdCjjmjaLGZvyCK0LcwU',
    category: 'Trà Sữa',
    distance: '0.5 km',
    location: 'Thanh Xuân, HN',
    description: 'Trà đào thơm nồng kết hợp cam vàng chua thanh, thoảng hương sả ấm áp giải nhiệt.'
  }
];

export const PLACE_ITEMS: PlaceItem[] = [
  {
    id: 'p1',
    name: 'Nhà Hàng Phố Cổ Hội An',
    location: 'Quận 1, TP. HCM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACqutZ-8Nydt2_D386oOUSQy6cg6FIyvhD8VHGoCTYCch-5DL54ohyoB8S3RcKP_-gqttxERaib4S4v9PrZFIVMN5OATOQtw7mWS0wxHbapSEKT69ndu1I75cKKWStr47QjD6tWmf3MwNBVnFlM_cNkAimF1OSSYKPWQ9i6RSPXjsJY78SW4E1W9j-vlGgUsATkmtUr7rmKDy_sC0plhfQDqC9DXhpVXqzan46IuZ057jWX62Pttetxzev6aBvQE0yoXchxRDRb4o',
    tag: 'Mới nhất',
    rating: 4.8,
    reviewsCount: 1280,
    address: '123 Đường Lê Lợi, Phường Minh An, TP. Hội An, Quảng Nam',
    operatingHours: '08:00 - 22:30 hàng ngày',
    description: 'Một không gian ẩm thực cổ kính, tinh tế, mang trọn tinh hoa món ngon xứ Quảng về giữa lòng phố thị sầm uất.'
  },
  {
    id: 'p2',
    name: 'The Urban Cafe',
    location: 'Quận 1, TP. HCM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB2DRDwbhfLifel3a6SWF7f6M40F4CFVZPdys-7PiuglYUKH2v-YWut7cZBglxnbkodQcy168MbuYOrtxapDcWOQ3NcHfTHnQr8UulL7QV74ECvaSMI04F6aa96L5D1UAztjlKETz1L_wDgX8-5XseBDVsmtcZ1om4pBnQjXqLvia3dhf4IRXjNqmHgpVoli53vet64rwWYSLl1oYOtlIh8h3HPCAEyGIveOMHlBwJLmTy7HVDxdp1DZoZEedbwuwIcstGNM4ZZkI',
    tag: 'Xu hướng',
    rating: 4.7,
    reviewsCount: 540,
    address: '45 Pasteur, Bến Nghé, Quận 1, TP. HCM',
    operatingHours: '07:00 - 23:00 hàng ngày',
    description: 'Thiết kế tối giản hiện đại với trần cao đón nắng tự nhiên và hàng cây xanh mướt tràn đầy thư thái.'
  },
  {
    id: 'p3',
    name: 'Công Viên Ánh Sáng',
    location: 'Quận 7, TP. HCM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjU4DsZAvngqlpcKRzeLLmEOTRfx4RsjXDe2pmryjB1dhV5vGj1Bu68voBefZZWG-hnS_kvD2OBbAnKFqoqpOWfxUq79AKhhH7yDheSRAOUxryNAEilIAtyJ_o1HebaXIigxIIDQC8kcJ2JdXt_GDd-aMHsVQapS4nbnfT9A6u7hf3VH1SzL_jTGAkqebu3m1IfD2WFTHDXHmC9XRW2Iwjk_aRuFqYZep19VfvtPmTVoHIOBuqEq5dh83BQydNi91QuAOFCX3ACDc',
    tag: 'Mới nhất',
    rating: 4.8,
    reviewsCount: 3820,
    address: 'Khu Đô Thị Phú Mỹ Hưng, Quận 7, TP. HCM',
    operatingHours: '05:00 - 22:00 hàng ngày',
    description: 'Quần thể công viên hiện đại với hồ bán nguyệt lãng mạn và các công trình điêu khắc ánh sáng rực rỡ lúc hoàng hôn.'
  },
  {
    id: 'p4',
    name: 'Đỉnh Tà Xùa - Săn mây',
    location: 'Sơn La, Việt Nam',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPFtbYI8v8F-K1xJfDItUic0VlDaB5bLms_WeO_20Ba92SSAKd1iYFzwbT2WD2ubddPVeGXP7HOzsR9dRZgPXQyajELRpDlCPG8VHDv_YyMzVZ589r16TwBfkFazjHn0fj8Xxcj5rvzNm-ruHvQPKaCAR2JJnMro1Z0efrU0XH1j5icLc_JGWsBF5fobDjXQ2UFZOA5vtstnInd-hB9pNVV7l_bBssfRqKdRHAZDEwMR9h2j1oLn2cq0lylrxZ0b33cwq8lcgl7iE',
    tag: 'Gợi ý',
    rating: 4.8,
    reviewsCount: 1200,
    address: 'Huyện Bắc Yên, tỉnh Sơn La',
    operatingHours: 'Mở cả ngày',
    description: 'Được mệnh danh là thiên đường săn mây ngập tràn sương trắng mềm mại trôi bồng bềnh giữa núi non hùng vĩ cực đại.'
  },
  {
    id: 'p5',
    name: 'Cà phê Rooftop - View Hồ Tây',
    location: 'Tây Hồ, Hà Nội',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6VYjct7URnedVRxqq9WMmjW6uxw4JZIiGIFt9MlB8TSVcHeDijEwY5ewbKp0NGkcpybY2mPpyuH0hACtpmRikbNPAz8mUDacIibkmYPKJ0-9KAADxXV984cnH-PGxnBRRoP0hyRETlzt8nXVUXpQ_G28kxQu5pA0lj2TfBanPOv7C1UQjH_lgJ_n3PUN91BG3rCifX0R25JU-TdZqISsqB-9EMjqzIxSM-O8XMHe9v-3CM_lpxdazdlARyR_dE5xeYDZ3T2fgyc4',
    tag: 'Xu hướng',
    rating: 4.5,
    reviewsCount: 860,
    address: '15 Nguyễn Đình Thi, Tây Hồ, Hà Nội',
    operatingHours: '08:00 - 23:00 hàng ngày',
    description: 'Quán cà phê tầng thượng thoáng đạt, nơi ngắm hoàng hôn đỏ rực buông xuống mặt nước mênh mông cực chill.'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post_1',
    authorName: 'Minh Trí',
    authorAvatar: USER_AVATAR,
    timeAgo: '2 giờ trước',
    location: 'Đà Nẵng',
    content: 'Hôm nay phát hiện ra quán Bún Chả ngon nhất nhì quận 1. Nước dùng thanh, chả nướng vừa tới, đặc biệt là không gian cực chill! 🍜✨',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZz3vURMZj9z9nfzjP_L_cInXttpm-5KT2wmrqv7cXmtX7QTGxZJpq1G111TADmPGuVGtbGhW4O4Do11RyzHr_OJ2wwtFpfPpnJX-4ouyI62rC0LIVhhIESEgfRTbASHXo8eSMHF2e5EeoXfnUAzigP4LGuyIjiCpn7-gBKmqYurYdemTYPgvLwVaZtWW-ShKlBmxox1_zOXC-zsdpGhM4521ZvQYYGyXHFOo_wC3RUrHVKGhVbk1tZVYFM4IkmS4sXZpoM2xI73o',
    likes: 128,
    commentsCount: 42,
    category: 'food',
    isLiked: false
  },
  {
    id: 'post_2',
    authorName: 'Linh Nguyễn',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoXQT4-pyzZC2G5ONNX9JeUoLKLs1Q_lvtrtzvJnUzxN2KaQkG2y6T-skJui0YEQu6fTKE9ofEM8FAAC3bGKny-iSO25kGh-XTiiMVB1rigqYLgerhj7d-sf3OQJuRTeFIOl_C0zM_qlc4m0hY5NHa8FT3for-AGkSgLdHyj03xuQW2Zol1VXHsz9QvFMaT3sJfR5342p0vupquzEY5XJbJvVhEWZutJ3N2quQ5lTI1ipBooz7NMlrIJtznZoRCxf6CGzL_NUbbKU',
    timeAgo: '5 giờ trước',
    location: 'Đà Lạt',
    content: 'Đà Lạt mùa này đẹp quá mọi người ơi. Ghé ngay tiệm cà phê này nhé, view triệu đô luôn! 🌲☕️',
    rating: 4.5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN78bPEXyYG-S6eMyP67-i-XSSrlC9AOft5Z9Kr7RYvjJ-bv0204IcfifTMGNqiOxv5ByX337q_ujq_516YeIx9SCrXtL92wO2sbriQHnQEszoQLKo1VR3CMHQ1KAWF4_SNWUjQiO79tq2vlvBqEvcUY0rOr9wrb7FNfpSfmBsGki9qWGOkQzrqYoTg0dr6dc72lsop2nW1RHyNKL4f1JTuDBvPmOgWul4Zj_NplxusJIpSmS6CWKDwoSIKC-tnhoAkwgJaoGUUnk',
    likes: 2500,
    commentsCount: 156,
    category: 'location',
    isLiked: true
  }
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    postId: 'post_1',
    authorName: 'An Nguyễn',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwpS4yeO3kxoI2_m2FYdcNFd_iSFw3KcUi0iYcaWSc-j4SBrBxWj_fjcZ4hTxjqtb9YmLBbHKshFaNmctOkf0F_YGQrV1a6uURRTxzKbSezg5LstZ2nuQS1wMUwgkkusjJtnGAf5sRo5OmnMr9mkJbUkGXgvdn9EOIuKBPZoXN7d3v78es-GrBWABsPbycJ-JaSKLel4o69rhYQ9-M7_NUSN9ZWwZfN-LAZFv_99uOmPu4hQNA9egxoLeVTYLHCDNNd_AJieKq8F4',
    timeAgo: 'Vừa mới đây',
    content: 'Món bún chả này nhìn ngon quá, địa chỉ ở đâu vậy bạn?'
  },
  {
    id: 'c2',
    postId: 'post_1',
    authorName: 'Minh Tú',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASA99Fz-ngPOdbGj4rEg1xJMC7RcDxAHNl5uu_333VTXCy2bDODI9BZQO49yMlAwlgwMUMjJQU0IXdDpbJCn-Y62Z7b9kD_JYl9jGO2k5E86tuEacIL-EjIwnCpYF7xIdXBQ0IlfoE3zUh_VrzIpH_u-V8-GUoLx0NF5_aS2sdiGe4zm-bBY7fyK-HmTkk7bETDjh9tK3KnPB44fZX7QTIxVL6KiT41lu7aqiNVum9s5hUgajKxAvq72HlzKslrENvyxLYIma3x10',
    timeAgo: '10 phút trước',
    content: 'Bác Trí review chuẩn thật sự, quán này pate ngon và chả cực ráo mỡ.'
  }
];
