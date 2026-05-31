import { useState, Dispatch, SetStateAction } from 'react';
import { Smartphone, Code, Cpu, Download, Copy, Check, Info, Settings, Wifi, Battery, FileCode, CheckCircle2 } from 'lucide-react';

interface AndroidDevPanelProps {
  deviceStats: {
    battery: number;
    wifi: boolean;
    network: string;
    theme: 'light' | 'dark';
  };
  setDeviceStats: Dispatch<SetStateAction<{
    battery: number;
    wifi: boolean;
    network: string;
    theme: 'light' | 'dark';
  }>>;
}

export default function AndroidDevPanel({ deviceStats, setDeviceStats }: AndroidDevPanelProps) {
  const [activeTab, setActiveTab] = useState<'compose' | 'apk' | 'stats'>('compose');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const composeCode = `@Composable
fun LuckyWheelScreen() {
    val items = remember {
        mutableStateListOf(
            "Phở Bò Gia Truyền", "Bún Chả Cửa Bắc", "Bánh Mì Đặc Biệt",
            "Lẩu Thái Seafood", "BBQ Premium Steak", "Trà Đào Cam Sả",
            "Cơm Tấm Sườn Bì", "Bún Bò O Ninh"
        )
    }
    
    var degrees by remember { mutableStateOf(0f) }
    var spinning by remember { mutableStateOf(false) }
    var prize by remember { mutableStateOf<String?>(null) }
    
    val animatedDegrees by animateFloatAsState(
        targetValue = degrees,
        animationSpec = tween(
            durationMillis = 4500,
            easing = CubicBezierEasing(0.15f, 0.95f, 0.3f, 1f)
        ),
        finishedListener = {
            spinning = false
            // Tính toán phần thưởng chính xác theo kim chỉ hướng Nam/Bắc
            val numSlices = items.size
            val extraAngle = (degrees % 360)
            val index = ((numSlices - (extraAngle / (360f / numSlices))).toInt()) % numSlices
            prize = items[index]
        }
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Bánh Xe Số Phận: Hôm Nay Ăn Gì?",
            fontSize = 22.sp,
            fontWeight = FontWeight.ExtraBold,
            color = MaterialTheme.colorScheme.onSurface
        )
        Spacer(modifier = Modifier.height(24.dp))
        
        Box(contentAlignment = Alignment.Center) {
            // Kim chỉ góc quay (Arrow Indicator)
            Icon(
                imageVector = Icons.Default.Navigation,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier
                    .size(40.dp)
                    .graphicsLayer { rotationZ = 180f }
                    .offset(y = (-150).dp)
            )
            
            // Vẽ Canvas Vòng Quay Bằng Jetpack Compose
            Canvas(
                modifier = Modifier
                    .size(280.dp)
                    .graphicsLayer { rotationZ = animatedDegrees }
            ) {
                val sizeArc = 360f / items.size
                items.forEachIndexed { index, item ->
                    drawArc(
                        color = getSliceColor(index),
                        startAngle = index * sizeArc,
                        sweepAngle = sizeArc,
                        useCenter = true
                    )
                }
            }
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = {
                if (!spinning) {
                    spinning = true
                    prize = null
                    val randomExtra = (0..359).random()
                    degrees += 1440f + randomExtra
                }
            },
            enabled = !spinning
        ) {
            Text(if (spinning) "Đang quay số..." else "Quay bánh xe 🎯")
        }
    }
}`;

  const capInstructions = `# HƯỚNG DẪN BIẾN DỰ ÁN NÀY THÀNH APP ANDROID (.APK)
# SỬ DỤNG CAPACITOR.JS (KHÔNG CẦN VIẾT LẠI CODE WEB)

# Bước 1: Khởi tạo Android Project trong ứng dụng React hiện tại
npm install @capacitor/core @capacitor/cli
npx cap init "Hom Nay An Gi" "com.homnayan.app" --web-dir=dist

# Bước 2: Build ứng dụng React thành HTML/JS
npm run build

# Bước 3: Thêm nền tảng Android
npm install @capacitor/android
npx cap add android

# Bước 4: Copy tài nguyên Web sang Android & Mở Android Studio
npx cap sync android
npx cap open android

# Bước 5: Trong Android Studio, chọn Build > Build Bundle(s)/APK(s) > Build APK(s)
# File APK sẽ được tạo thành công dưới thư mục app/build/outputs/apk/debug/app-debug.apk 📱`;

  return (
    <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-lg overflow-hidden h-full flex flex-col">
      
      {/* Title Hub bar */}
      <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Smartphone className="w-6 h-6 animate-pulse" />
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider">Android Developer Hub</h3>
            <p className="text-[10px] opacity-85 font-medium">Lập trình ứng dụng di động cho "Hôm Nay Ăn Gì?"</p>
          </div>
        </div>
        <div className="bg-white/20 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide">
          MOBILE RUNTIME
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-outline-variant/20 bg-slate-50">
        <button
          onClick={() => setActiveTab('compose')}
          className={`flex-1 py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'compose' 
              ? 'border-emerald-600 text-emerald-700 bg-white' 
              : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-slate-100/50'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Jetpack Compose (Kotlin)</span>
        </button>
        <button
          onClick={() => setActiveTab('apk')}
          className={`flex-1 py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'apk' 
              ? 'border-emerald-600 text-emerald-700 bg-white' 
              : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-slate-100/50'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Biến thành APK</span>
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'stats' 
              ? 'border-emerald-600 text-emerald-700 bg-white' 
              : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-slate-100/50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Thiết lập Giả lập</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-grow p-5 overflow-y-auto max-h-[500px]">
        {activeTab === 'compose' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100/50 flex gap-2.5 items-start">
              <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-900 leading-relaxed font-medium">
                Dưới đây là mã nguồn <strong>Jetpack Compose (Kotlin)</strong> dùng để vẽ <strong>Bánh xe số phận</strong> đồng bộ dữ liệu chuẩn Android Mobile. Mọi animation quay, lực cản ma sát quay tuyến tính đều đã được đồng bộ chuẩn UI.
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => handleCopy(composeCode, 'compose')}
                className="absolute top-3 right-3 bg-slate-800 text-white p-2 rounded-xl hover:bg-slate-700 transition"
              >
                {copiedText === 'compose' ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-96 leading-normal">
                {composeCode}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'apk' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100/50 flex gap-2.5 items-start">
              <Download className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
                Sử dụng Capacitor.js do Google/Ionic hỗ trợ để nhanh chóng đóng gói toàn bộ giao diện, hiệu ứng và cơ sở dữ liệu gợi ý này thành tệp cài đặt <strong>Android (.APK)</strong> thật chạy trên điện thoại chỉ với 5 lệnh terminal!
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => handleCopy(capInstructions, 'apk')}
                className="absolute top-3 right-3 bg-slate-800 text-white p-2 rounded-xl hover:bg-slate-700 transition"
              >
                {copiedText === 'apk' ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-96 leading-normal">
                {capInstructions}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <p className="text-xs text-on-surface-variant">
              Tùy chỉnh thông số điện thoại Android nằm trong khung mô phỏng bên trái:
            </p>

            {/* Battery settings */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface flex justify-between">
                <span>Dung lượng pin:</span>
                <span className="text-primary font-mono">{deviceStats.battery}%</span>
              </label>
              <div className="flex gap-2 items-center">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={deviceStats.battery}
                  onChange={(e) => setDeviceStats({ ...deviceStats, battery: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            {/* Network Toggle */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-xs font-bold text-on-surface">Kết nối Wifi:</span>
              <button
                onClick={() => setDeviceStats({ ...deviceStats, wifi: !deviceStats.wifi })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  deviceStats.wifi ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                  deviceStats.wifi ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Network Signals */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-on-surface">Mạng di động:</span>
              <div className="flex gap-2">
                {['5G', 'LTE', '4G', '3G'].map((net) => (
                  <button
                    key={net}
                    onClick={() => setDeviceStats({ ...deviceStats, network: net })}
                    className={`flex-1 py-1.5 rounded-xl border font-bold text-[10px] transition-all ${
                      deviceStats.network === net 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                        : 'border-slate-200 text-on-surface-variant hover:bg-slate-50'
                    }`}
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Dark Mode Theme simulator wrapper indicator */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Wifi className="w-5 h-5 text-emerald-600 animate-pulse" />
              <div>
                <span className="block text-xs font-bold">Android Mock Status:</span>
                <span className="text-[10px] text-on-surface-variant">
                  {deviceStats.wifi ? 'Connected to local Wi-Fi 6E' : 'Using cellular'} - Signal ({deviceStats.network})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer support */}
      <div className="p-4 bg-slate-50 border-t border-outline-variant/10 text-center">
        <span className="text-[10px] text-on-surface-variant font-medium">
          Dự án "Hôm Nay Ăn Gì?" sẵn sàng đóng gói cho thiết bị đầu cuối Android!
        </span>
      </div>

    </div>
  );
}
