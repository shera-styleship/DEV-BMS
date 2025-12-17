import "@components/feature/TimeTask.css";
import Button from "@components/common/Button";

const TimeTask = ()=>{
    return (
        <div className="TimeTask">
            <div className="time-list">
                <div>

                    <div class="time">
                        <dl>
                            <dt>작업자</dt>
                            <dd>홍길동</dd>
                        </dl>
                        <div>
                            <dl>
                                <dt>작업일자</dt>
                                <dd>2025-10-15</dd>
                            </dl>
                            <dl>
                                <dt>작업시간</dt>
                                <dd>3.5시간</dd>
                            </dl>
                            <button type="button" className="edit-time__btn">EDIT</button>
                        </div>
                    </div>

                     <div class="time">
                        <dl>
                            <dt>작업자</dt>
                            <dd>홍길동</dd>
                        </dl>
                        <div>
                            <dl>
                                <dt>작업일자</dt>
                                <dd>2025-10-15</dd>
                            </dl>
                            <dl>
                                <dt>작업시간</dt>
                                <dd>3.5시간</dd>
                            </dl>
                            <button type="button" className="edit-time__btn">EDIT</button>
                        </div>
                    </div>

                    <div class="time">
                        <dl>
                            <dt>작업자</dt>
                            <dd>홍길동</dd>
                        </dl>
                        <div>
                            <dl>
                                <dt>작업일자</dt>
                                <dd>2025-10-15</dd>
                            </dl>
                            <dl>
                                <dt>작업시간</dt>
                                <dd>3.5시간</dd>
                            </dl>
                            <button type="button" className="edit-time__btn">EDIT</button>
                        </div>
                    </div>
                
                </div>
            </div>

            <div className="time-input">
                <Button btnType="button" btnSize="middle" btnChar="orange">
                    작업시간 입력하기
                </Button>
            </div>
        </div>
    )
}
export default TimeTask;