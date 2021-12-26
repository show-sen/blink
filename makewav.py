import numpy as np
import struct
import wave

#振幅
A1=0.1

#基本周波数
f1 =1600

#サンプリング周波数
fs = 44100

#時間（秒）
sec = 10 

filename = "sample.wav"
#サンプリングした時の時間軸
t = np.arange(0.0, sec, 1 / fs)

def create_wave(file_name,wave_data,fs):
    #16bit符号付き整数に変換
    wave_data = [int(x * 32767.0) for x in wave_data]

    #バイナリ化
    binwave = struct.pack("h" * len(wave_data), *wave_data)

    #wavファイルとして書き出し
    wf = wave.Wave_write(filename)
    wf.setparams((
        1,                          # channel
        2,                          # byte width
        fs,                         # sampling rate
        len(wave_data),                  # number of frames
        "NONE", "not compressed"    # no compression
        ))
    wf.writeframes(binwave)
    wf.close()


def square_wave(A,f0,t):
    squarewav=np.array([0.0 for i in range(len(t))])
    for i in range(len(t)):
        if np.sin(np.pi*f0*t[i])>0:
            squarewav[i]=1*A
        elif np.sin(np.pi*f0*t[i])==0:
            squarewav[i]=0*A
        elif np.sin(np.pi*f0*t[i])<0:
            squarewav[i]=-1*A
    return squarewav

#矩形波の描画　サンプル
squarewav=square_wave(A1,f1,t)
create_wave('squarewav_test',squarewav, fs)
