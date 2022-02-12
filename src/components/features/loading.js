import style from "../../styles/loader.module.css";

export default function Loading() {
  return (
    <>
      <div className=" h-60  flex flex-col items-center">
        <div className="">
          <div className={style.blobs}>
            <div className={style.blobcenter}></div>
            <div className={style.blob}></div>
            <div className={style.blob}></div>
            <div className={style.blob}></div>
            <div className={style.blob}></div>
            <div className={style.blob}></div>
            <div className={style.blob}></div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
