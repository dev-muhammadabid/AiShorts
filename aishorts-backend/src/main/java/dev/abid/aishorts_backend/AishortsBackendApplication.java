//Package Declaration
package dev.abid.aishorts_backend;

//Imports
import com.twilio.Twilio;
import dev.abid.aishorts_backend.configurations.TwilioConfig;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

//Annotation
@SpringBootApplication
@EnableConfigurationProperties
public class AishortsBackendApplication {

	@Autowired
	private TwilioConfig twilioConfig;

	@PostConstruct
	public void setup(){
		Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
	}

	public static void main(String[] args) {

		SpringApplication.run(AishortsBackendApplication.class, args);
	}

}
