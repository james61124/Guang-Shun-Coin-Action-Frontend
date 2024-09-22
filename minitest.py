import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestWebsiteUI(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/login')

    def login_with_credentials(self, cellphone, password):
        inputs = self.driver.find_elements(By.CLASS_NAME, 'Login_input__eAiBr')
        login_button = self.driver.find_element(By.CLASS_NAME, 'Login_inputButton__gWnqa')
        
        cellphone_input = inputs[0]
        password_input = inputs[1]

        cellphone_input.clear()
        password_input.clear()
        cellphone_input.send_keys(cellphone)
        password_input.send_keys(password)
        login_button.click()

    def assert_error_message(self, expected_message):
        error_label = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[3]/label'))
        )
        self.assertIn(expected_message, error_label.text)

    def test_login_cellphone_empty(self):
        self.login_with_credentials('', '')
        self.assert_error_message('請輸入電話')
    
    def test_login_password_empty(self):
        self.login_with_credentials('0912345678', '')
        self.assert_error_message('請輸入密碼')
    
    def test_login_password_empty(self):
        self.login_with_credentials('0912345678', 'abc')
        self.assert_error_message('資訊錯誤')
    
    def test_login_password_empty(self):
        self.login_with_credentials('0912345679', 'abc')
        self.assert_error_message('資訊錯誤')
    
    # PopUpMessage_modalTitle__UgbTj

    def tearDown(self):
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()